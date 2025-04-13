const path = require("path");
const multer = require("multer");

// Create uploads folder if not exists
const fs = require("fs");
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Controller handler
const uploadNote = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    fileUrl: `http://localhost:3000/uploads/${req.file.filename}`,
  });
};

module.exports = {
  upload,
  uploadNote,
};