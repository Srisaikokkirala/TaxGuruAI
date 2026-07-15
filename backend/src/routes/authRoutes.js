const express = require("express");
const { getMe, updateProfile } = require("../controllers/authController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateToken, getMe);
router.put("/profile", authenticateToken, updateProfile);

module.exports = router;
