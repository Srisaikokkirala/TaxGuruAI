const { DEFAULT_TAX_HELP_MESSAGE } = require("../config/constants");
const { isTaxRelatedQuestion } = require("../utils/domainGuard");
const { createChatTitle } = require("../utils/chatTitle");
const {
  createChatForUser,
  getChatsForUser,
  getChatById,
  appendMessage,
  removeLastAssistantMessage,
  deleteChatForUser,
  clearChatsForUser,
  updateMessageFeedback,
} = require("../services/chatHistoryService");
const { generateTaxReply } = require("../services/llmService");

function mapChatToResponse(chat) {
  return {
    id: chat._id,
    title: chat.title,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
    lastMessageAt: chat.lastMessageAt,
    messageCount: chat.messageIds?.length || 0,
    messages: (chat.messageIds || []).map((message) => ({
      id: message._id,
      role: message.role,
      content: message.content,
      feedback: message.feedback,
      feedbackAt: message.feedbackAt,
      createdAt: message.createdAt,
    })),
  };
}

async function postChat(req, res, next) {
  try {
    const { message, chatId, regenerate = false } = req.body || {};

    if (!regenerate && (!message || !String(message).trim())) {
      return res.status(400).json({
        message: "Message is required.",
      });
    }

    if (!regenerate && !isTaxRelatedQuestion(message)) {
      return res.json({
        reply: DEFAULT_TAX_HELP_MESSAGE,
        needsTaxContext: true,
      });
    }

    const user = req.user;
    let chat = null;

    if (chatId) {
      chat = await getChatById(chatId, user._id);
    }

    if (!chat) {
      const initialTitle = createChatTitle(message || "Tax question");
      chat = await createChatForUser(user._id, initialTitle);
    }

    if (!regenerate) {
      await appendMessage(chat._id, "user", String(message).trim());
    } else {
      await removeLastAssistantMessage(chat._id);
    }

    const refreshedChat = await getChatById(chat._id, user._id);

    const conversation = (refreshedChat?.messageIds || []).map((entry) => ({
      role: entry.role,
      content: entry.content,
    }));

    const llmResult = await generateTaxReply(conversation);

    if (
      llmResult &&
      typeof llmResult === "object" &&
      llmResult.success === false
    ) {
      console.error(
        "LLM Error:",
        JSON.stringify(llmResult, null, 2)
      );

      return res.status(502).json({
        error: llmResult,
      });
    }

    const assistantMessage = await appendMessage(
      chat._id,
      "assistant",
      llmResult
    );

    if (chat.title === "New Tax Chat" || !chat.title) {
      chat.title = createChatTitle(message || "Tax question");
      await chat.save();
    }

    const finalChat = await getChatById(chat._id, user._id);

    return res.json({
      reply: llmResult,
      chatId: chat._id,
      assistantMessageId: assistantMessage._id,
      title: chat.title,
      messages: mapChatToResponse(finalChat).messages,
    });
  } catch (error) {
    console.error("POST /chat ERROR");
    console.error(error);
    console.error(error.stack);

    next(error);
  }
}

async function listChats(req, res, next) {
  try {
    const user = req.user;
    const chats = await getChatsForUser(user._id);

    return res.json({
      chats: chats.map((chat) => ({
        id: chat._id,
        title: chat.title,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        lastMessageAt: chat.lastMessageAt,
        messageCount: chat.messageCount,
      })),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getChat(req, res, next) {
  try {
    const user = req.user;
    const chat = await getChatById(req.params.chatId, user._id);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found.",
      });
    }

    return res.json({
      chat: mapChatToResponse(chat),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function removeChat(req, res, next) {
  try {
    const user = req.user;
    const removed = await deleteChatForUser(req.params.chatId, user._id);

    if (!removed) {
      return res.status(404).json({
        message: "Chat not found.",
      });
    }

    return res.json({
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function clearChats(req, res, next) {
  try {
    const user = req.user;
    const result = await clearChatsForUser(user._id);

    return res.json({
      message: "All chats cleared.",
      ...result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function updateFeedback(req, res, next) {
  try {
    const { feedback } = req.body || {};

    const allowedValues = ["like", "dislike", ""];

    if (!allowedValues.includes(feedback)) {
      return res.status(400).json({
        message:
          "Feedback must be 'like', 'dislike', or empty.",
      });
    }

    const message = await updateMessageFeedback(
      req.params.messageId,
      feedback
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    return res.json({
      message: {
        id: message._id,
        feedback: message.feedback,
        feedbackAt: message.feedbackAt,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  postChat,
  listChats,
  getChat,
  removeChat,
  clearChats,
  updateFeedback,
};