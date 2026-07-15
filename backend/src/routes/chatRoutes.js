const express = require("express");
const {
  postChat,
  listChats,
  getChat,
  removeChat,
  clearChats,
  updateFeedback,
} = require("../controllers/chatController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Protect all chat routes
router.use(authenticateToken);

router.post("/chat", postChat);
router.get("/chats", listChats);
router.get("/chats/:chatId", getChat);
router.delete("/chats/:chatId", removeChat);
router.delete("/chats", clearChats);
router.patch("/messages/:messageId/feedback", updateFeedback);

// Additional Protected Routes
router.get("/history", (req, res) => {
  res.json({ message: "History retrieved.", chatsCount: 0 });
});

router.get("/profile", (req, res) => {
  res.json({
    message: "Profile retrieved.",
    user: {
      id: req.user._id,
      clerkUserId: req.user.clerkUserId,
      phoneNumber: req.user.phoneNumber,
      displayName: req.user.displayName,
      username: req.user.username,
    }
  });
});

router.get("/settings", (req, res) => {
  res.json({
    message: "Settings retrieved.",
    settings: {
      theme: "dark",
      notifications: true,
    }
  });
});

module.exports = router;
