const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/user.js");
const Question = require("./models/question.js");
const authMiddleware = require("./Middleware/authMiddleware.js");
const adminMiddleware = require("./Middleware/adminMiddleware.js")
const hackathonRoutes = require("./routes/hackathonRoutes.js")
const submissionRoutes = require("./routes/submissionRoutes.js")

// CORS setup (allow frontend dev server)
const corsOptions = {
    origin: ['http://localhost:5173',"http://localhost:3000"],
};
app.use(cors(corsOptions));

/**
 * User Login
 */
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// User Registration

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        // Auto login after register (optional)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Add Question (Protected)
 */
app.post("/add-question", authMiddleware,adminMiddleware, async (req, res) => {
    try {
        const q = new Question(req.body);
        await q.save();
        res.json({ message: "Question added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Get All Questions (Protected)
 */
app.get("/quiz", authMiddleware, async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// routes
app.use("/api/hackathons", hackathonRoutes)

app.use("/api/submissions", submissionRoutes)


// Start Server
const db = require("./database/db.js");
const PORT = process.env.PORT || 6969;
db().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Database connection failed:", err);
});


