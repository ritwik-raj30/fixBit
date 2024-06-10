const mongoose = require("mongoose");

module.exports = connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB .", error.message);
    process.exit(1);
  }
};
