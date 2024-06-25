const Complaint = require("../models/complainModel");

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { username, rollNumber, from, complaint, imageUrl } = req.body;
    const newComplaint = new Complaint({
      username,
      rollNumber,
      from,
      complaint,
      imageUrl,
    });
    await newComplaint.save();
    res
      .status(201)
      .json({ status: true, msg: "Complaint submitted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "An error occurred. Please try again." });
  }
};

// Get all complaints
exports.allgetComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "An error occurred. Please try again." });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const { id } = req.params;
    const complaints = await Complaint.find({ from: id });
    res.status(200).json(complaints);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "An error occurred. Please try again." });
  }
};
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: true, msg: "Complaint deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "An error occurred. Please try again." });
  }
};