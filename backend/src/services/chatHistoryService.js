const User = require("../models/User");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { DEMO_USER } = require("../config/constants");

async function ensureDemoUser() {
  let user = await User.findOne({ email: DEMO_USER.email });

  if (!user) {
    user = await User.create({
      email: DEMO_USER.email,
      displayName: DEMO_USER.displayName,
      provider: "demo",
    });
  }

  return user;
}

async function createChatForUser(userId, title) {
  return Chat.create({
    user: userId,
    title,
    messageIds: [],
    lastMessageAt: new Date(),
  });
}

async function getChatsForUser(userId) {
  const chats = await Chat.find({ user: userId })
    .sort({ lastMessageAt: -1, updatedAt: -1 })
    .lean();

  return chats.map((chat) => ({
    ...chat,
    messageCount: chat.messageIds?.length || 0,
  }));
}

async function getChatById(chatId, userId) {
  return Chat.findOne({ _id: chatId, user: userId }).populate({
    path: "messageIds",
    options: { sort: { createdAt: 1 } },
  });
}

async function appendMessage(chatId, role, content) {
  const message = await Message.create({ chat: chatId, role, content });

  await Chat.findByIdAndUpdate(chatId, {
    $push: { messageIds: message._id },
    $set: { lastMessageAt: new Date() },
  });

  return message;
}

async function removeLastAssistantMessage(chatId) {
  const chat = await Chat.findById(chatId).populate({
    path: "messageIds",
    options: { sort: { createdAt: 1 } },
  });

  if (!chat || !chat.messageIds.length) {
    return null;
  }

  const lastMessage = chat.messageIds[chat.messageIds.length - 1];

  if (lastMessage.role !== "assistant") {
    return null;
  }

  await Message.findByIdAndDelete(lastMessage._id);
  chat.messageIds.pop();
  chat.lastMessageAt = new Date();
  await chat.save();
  return lastMessage;
}

async function deleteChatForUser(chatId, userId) {
  const chat = await Chat.findOne({ _id: chatId, user: userId });

  if (!chat) {
    return null;
  }

  await Message.deleteMany({ chat: chat._id });
  await chat.deleteOne();
  return chat;
}

async function clearChatsForUser(userId) {
  const chats = await Chat.find({ user: userId }).select("_id");
  const chatIds = chats.map((chat) => chat._id);

  if (chatIds.length) {
    await Message.deleteMany({ chat: { $in: chatIds } });
    await Chat.deleteMany({ _id: { $in: chatIds } });
  }

  return { deletedChats: chatIds.length };
}

async function updateMessageFeedback(messageId, feedback) {
  const message = await Message.findById(messageId);

  if (!message) {
    return null;
  }

  message.feedback = feedback;
  message.feedbackAt = feedback ? new Date() : null;
  await message.save();

  return message;
}

module.exports = {
  ensureDemoUser,
  createChatForUser,
  getChatsForUser,
  getChatById,
  appendMessage,
  removeLastAssistantMessage,
  deleteChatForUser,
  clearChatsForUser,
  updateMessageFeedback,
};
