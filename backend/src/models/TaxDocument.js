const mongoose = require("mongoose");

const taxDocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Optional: links the document to a specific chat conversation.
    // Used in Phase 2+ to delete the PDF when the chat is deleted.
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
      index: true,
    },
    // Original filename as provided by the user's browser
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    // UUID-based filename on disk (prevents collisions)
    storedName: {
      type: String,
      required: true,
      unique: true,
    },
    // Absolute path to the stored file on disk
    filePath: {
      type: String,
      required: true,
    },
    // File size in bytes
    fileSize: {
      type: Number,
      required: true,
    },
    // Always "application/pdf" — validated by upload middleware
    mimeType: {
      type: String,
      required: true,
      default: "application/pdf",
    },
    // Processing lifecycle for Phase 2+ (extraction, RAG, validation)
    status: {
      type: String,
      enum: ["uploaded", "processing", "processed", "failed"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxDocument", taxDocumentSchema);
