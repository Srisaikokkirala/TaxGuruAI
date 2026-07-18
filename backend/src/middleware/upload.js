const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Permanent storage directory for uploaded tax PDFs
const UPLOAD_DIR = path.join(__dirname, "../../uploads/tax-documents");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    // UUID + timestamp ensures unique filenames even if two users
    // upload the same filename simultaneously
    const ext = path.extname(file.originalname).toLowerCase() || ".pdf";
    const uniqueName = `${uuidv4()}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// Reject any file that is not a PDF
function fileFilter(_req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    const err = new Error("Only PDF files are accepted.");
    err.status = 400;
    cb(err, false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// Single-file upload on field name "pdf"
const uploadSingle = upload.single("pdf");

module.exports = { uploadSingle, UPLOAD_DIR };
