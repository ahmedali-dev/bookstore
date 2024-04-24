const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const UPLOAD_DIR = path.resolve(__dirname, "./../images");
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

// Helper function to ensure the upload directory exists
function ensureUploadDirExists() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDirExists();
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${Date.now()}-${crypto.randomUUID()}${fileExtension}`;
    cb(null, newFilename);
  },
});

// Define file filtering rules
const imageFilter = (req, file, cb) => {
  const allowedExtensions = /\.(png|jpg|jpeg)$/i;
  if (!allowedExtensions.test(path.extname(file.originalname))) {
    cb(new Error("Unsupported file type. Allowed types: PNG, JPG, JPEG"), false);
  } else {
    cb(null, true);
  }
};

// Initialize multer with configured settings
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageFilter,
});

module.exports = upload;
