const Complaint = require('../models/complainModel');
const express = require('express');
const router = express.Router();
const complaintController = require('../controller/userComplain');

// Create a new complaint
router.post('/submit', complaintController.createComplaint);

// Get all complaints
router.get('/all', complaintController.getComplaints);
module.exports = router;

// Create a new complaint
// exports.createComplaint = async (req, res) => {
//   try {
//     const complaint = new Complaint(req.body);
//     await complaint.save();
//     res.status(201).send(complaint);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Get all complaints
// exports.getComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find();
//     res.status(200).send(complaints);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };