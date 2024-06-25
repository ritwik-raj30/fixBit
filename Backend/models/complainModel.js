const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rollNumber: { type: String, required: true },
    complaint: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
