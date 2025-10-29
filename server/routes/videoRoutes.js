import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Video from "../models/Video.js";

const router = express.Router();

// ✅ Ensure uploads folder exists at root
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ POST - upload video
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const video = new Video({
      title: req.body.title || "Untitled Video",
      filename: req.file.filename,
      path: req.file.path,
    });
    await video.save();
    res.json({ message: "✅ Video uploaded successfully", video });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ error: "Video upload failed" });
  }
});

// ✅ GET - fetch all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// ✅ GET - stream a video
router.get("/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});

export default router;

