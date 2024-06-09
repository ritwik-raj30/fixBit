//modules import
const express = require("express");

//file import
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const connectToMongoDB = require("./db/dbConnect");

require("dotenv").config();
const PORT = process.env.PORT || 5500;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
