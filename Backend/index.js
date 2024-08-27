//modules import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

//file import
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const complainRoutes = require("./routes/submit");
const updateRoutes = require("./routes/update");
const connectToMongoDB = require("./db/dbConnect");
const verifyToken = require("./utils/verifyToken");

require("dotenv").config();
const PORT = process.env.PORT || 5500;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/verify", verifyToken, (req, res) => {
  res.json(req.user);
});
app.use("/api/message", messageRoutes);
app.use("/api/complain", complainRoutes);
app.use("/api/update", updateRoutes);

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);

      // Initialize Socket.IO server here
      const io = socket(server, {
        cors: {
          // origin: "https://fix-bit.netlify.app",
          origin: "http://localhost:3000",
          credentials: true,
        },
      });

      global.onlineUsers = new Map();

      io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
          }
        });
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
