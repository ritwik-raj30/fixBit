const express = require('express');
const { addMessage, getAllMessage } = require("../controller/messageController");

const router = express.Router();

router.post('/addmsg', async (req, res) => {
    const { from, to, message } = req.body;
    console.log("Received:", { from, to, message });

    if (!from || !to || !message) {
        return res.status(400).json({ msg: 'Missing fields in request body' });
    }
}),

// Route to get all messages
router.post("/getmsg/", async (req, res, next) => {
    try {
        await getAllMessage(req, res, next);
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
}
);

module.exports = router;
