const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

// In-memory messages (replace with DB if needed)
let messages = [];

// POST message
router.post('/posts', upload.single('file'), (req, res) => {
    const { message, sender } = req.body;
    const file = req.file;

    if (!message || !sender) {
        return res.status(400).json({ error: 'Message and sender are required.' });
    }

    const newMsg = {
        id: messages.length + 1,
        message,
        sender,
        fileUrl: file ? `/uploads/${file.filename}` : null,
        timestamp: new Date()
    };

    messages.push(newMsg);

    res.status(201).json({ success: true, message: newMsg });
});

// GET messages
router.get('/posts', (req, res) => {
    res.json(messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

module.exports = router;
