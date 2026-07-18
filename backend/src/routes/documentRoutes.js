const express = require("express");
const authenticateToken = require("../middleware/auth");
const { uploadSingle } = require("../middleware/upload");
const { uploadDocument, getDocuments } = require("../controllers/documentController");

const router = express.Router();

// Protect all document routes with the same Clerk auth middleware used for chats
router.use(authenticateToken);

/**
 * POST /documents/upload
 * Multer processes the multipart/form-data file first,
 * then the controller saves the metadata to MongoDB.
 *
 * Multer errors (wrong MIME type, file too large) are forwarded
 * to the Express error handler via the wrapper below.
 */
router.post("/documents/upload", (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      // Multer or file-filter errors — send a clean 400 response
      return res.status(err.status || 400).json({
        message: err.message || "File upload failed.",
      });
    }
    next();
  });
}, uploadDocument);

/**
 * GET /documents
 * Returns all documents for the current user.
 * Ready for Phase 2+ document history UI.
 */
router.get("/documents", getDocuments);

module.exports = router;
