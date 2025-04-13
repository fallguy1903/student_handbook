const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { upload, uploadNote } = require("../controller/notesController");

// POST /api/notes/upload
router.post("/upload", isAuth, upload.single("file"), uploadNote);

module.exports = router;