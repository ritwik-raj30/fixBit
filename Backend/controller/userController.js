const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose"); // Import mongoose
module.exports.login = async (req, res, next) => {
  try {
    const { username, password, role, secertkey } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const ValidPassword = await bcrypt.compare(password, user.password);
    if (!ValidPassword)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    if (role !== "admin" && user.isadmin)
      return res.json({ msg: "You are not register", status: false });
    if (role === "admin" && !user.isadmin)
      return res.json({ msg: "You are not an admin", status: false });
    if (role === "admin" && secertkey !== process.env.ADMIN_KEY)
      return res.json({ msg: "Invalid Secert Key", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, gender, role, secertkey } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    // console.log(process.env.ADMIN_KEY);
    // console.log(secertkey);
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "admin" && secertkey !== process.env.ADMIN_KEY)
      return res.json({ msg: "Invalid Secert Key", status: false });

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      ProfileImage: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
      isadmin: role === "admin" ? true : false,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id.trim(); // Trim the ID to remove any extraneous whitespace or newline characters

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const users = await User.find({
      _id: { $ne: userId },
      isadmin: false,
    }).select(["email", "username", "ProfileImage", "_id"]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.getAlladmin = async (req, res, next) => {
  try {
    const userId = req.params.id.trim(); // Trim the ID to remove any extraneous whitespace or newline characters

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const users = await User.find({ isadmin: true }).select([
      "email",
      "username",
      "ProfileImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

// userController.js

module.exports.logOut = (req, res, next) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ msg: "User id is required" });
    }

    // Perform logout operations (e.g., clear sessions, tokens, etc.)
    // Example: Clearing user session or token

    // Send a success response
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    next(error); // Pass any caught errors to Express error handling middleware
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "1111", { expiresIn: '23h' });
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User with that email does not exist" });
    }

    const token = generateToken(foundUser._id);
    console.log("generated");
    console.log(token);


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "zen.jaiswal34@gmail.com",
        pass: "ejbtxdljmgevlkmw",
      }
    });

    const mailOptions = {
      from: 'sam92@ethereal.email',
      to: foundUser.email,
      subject: 'Reset Password Link',
      text: `Use the following link to reset your password: http://localhost:3000/reset-password/${foundUser._id}/${token}`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send('Message link sent to your email');
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); // Adjust the path as needed

module.exports.resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { newPassword } = req.body;

    // Debugging: Log received token before trimming
    console.log('Raw received token:', token);

    // Trim the token to remove any extraneous whitespace
    const trimmedToken = token.trim();

    // Debugging: Log the trimmed token
    console.log('Trimmed token:', trimmedToken);

    // Decode token without verification for debugging
    const decodedWithoutVerification = jwt.decode(trimmedToken);
    console.log('Decoded token without verification:', decodedWithoutVerification);

    // Verify token
    console.log('Attempting to decode token...');
    const decoded = jwt.verify(trimmedToken, '1111');
    console.log('Decoded token:', decoded);

    if (decoded.id !== userId) {
      return res.status(401).json({ message: 'Invalid token or user ID' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
