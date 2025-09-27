const User = require("../models/user");

async function adminMiddleware(req, res, next) {
    try {
        // req.user should already exist from authMiddleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied, admin only" });
        }

        // Allow admin to proceed
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = adminMiddleware;
