const jwt = require("jsonwebtoken");

const generateToken = (user, res) => {
  const payload = {
    id: user._id,
    email: user.email,
    isadmin: user.isadmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
};

module.exports = generateToken;
