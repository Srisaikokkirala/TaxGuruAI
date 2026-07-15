const User = require("../models/User");

async function getMe(req, res, next) {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        clerkUserId: req.user.clerkUserId,
        phoneNumber: req.user.phoneNumber,
        username: req.user.username,
        displayName: req.user.displayName,
        provider: req.user.provider,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in getMe:", error);
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { displayName } = req.body;
    if (!displayName || displayName.trim() === "") {
      return res.status(400).json({ message: "Display name is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.displayName = displayName.trim();
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        clerkUserId: user.clerkUserId,
        phoneNumber: user.phoneNumber,
        username: user.username,
        displayName: user.displayName,
        provider: user.provider,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    next(error);
  }
}

module.exports = {
  getMe,
  updateProfile,
};
