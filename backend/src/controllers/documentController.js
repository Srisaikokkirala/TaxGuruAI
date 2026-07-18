const path = require("path");
const TaxDocument = require("../models/TaxDocument");

/**
 * POST /documents/upload
 * Receives a PDF file from Multer, persists metadata to MongoDB,
 * and returns the document record.
 */
async function uploadDocument(req, res, next) {
  try {
    // Multer places the uploaded file on req.file
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded. Please attach a PDF file.",
      });
    }

    const { originalname, filename, path: filePath, size, mimetype } = req.file;

    // Persist document metadata to MongoDB
    const doc = await TaxDocument.create({
      user: req.user._id,
      chatId: req.body.chatId || null, // Optional: associate with an open chat
      originalName: originalname,
      storedName: filename,
      filePath: path.resolve(filePath),
      fileSize: size,
      mimeType: mimetype,
      status: "uploaded",
    });

    return res.status(201).json({
      message: "PDF uploaded successfully.",
      document: {
        id: doc._id,
        originalName: doc.originalName,
        fileSize: doc.fileSize,
        status: doc.status,
        chatId: doc.chatId,
        createdAt: doc.createdAt,
      },
    });
  } catch (error) {
    console.error("POST /documents/upload ERROR:", error);
    next(error);
  }
}

/**
 * GET /documents
 * Returns all uploaded documents belonging to the authenticated user.
 * Prepared for Phase 2+ (document history UI, RAG selection).
 */
async function getDocuments(req, res, next) {
  try {
    const docs = await TaxDocument.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("_id originalName fileSize status chatId createdAt")
      .lean();

    return res.json({
      documents: docs.map((doc) => ({
        id: doc._id,
        originalName: doc.originalName,
        fileSize: doc.fileSize,
        status: doc.status,
        chatId: doc.chatId,
        createdAt: doc.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /documents ERROR:", error);
    next(error);
  }
}

module.exports = { uploadDocument, getDocuments };
