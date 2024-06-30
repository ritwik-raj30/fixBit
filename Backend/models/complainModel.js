const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  username: { type: String, required: true },
  roomNumber: { type: String, required: true },
  rollNumber: { type: String, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  complaint: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, default: "pending" } // New field added
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
