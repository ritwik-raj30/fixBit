const Complaint = require('../models/complainModel');

// Create a new complaint
exports.createComplaint = async (req, res) => {
    try {
        const { username, rollNumber, complaint, imageUrl } = req.body;
        const newComplaint = new Complaint({
          username,
          rollNumber,
          complaint,
          imageUrl,
        });
        await newComplaint.save();
        res.status(201).json({ status: true, msg: 'Complaint submitted successfully!' });
      } catch (error) {
        res.status(500).json({ status: false, msg: 'An error occurred. Please try again.' });
      }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
      } catch (error) {
        res.status(500).json({ status: false, msg: 'An error occurred. Please try again.' });
      }
};