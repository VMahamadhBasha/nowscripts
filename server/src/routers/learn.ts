import { Router } from "express";
import Course from "../models/course";
import Module from "../models/module";
import Lesson from "../models/lesson";
import Quiz from "../models/quiz";
import UserProgress from "../models/userProgress";
import Bookmark from "../models/bookmark";

const router = Router();

// Get all courses with modules
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("modules").sort({ order: 1 });
    res.status(200).json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single module with lesson and quiz
router.get("/modules/:id", async (req, res) => {
  try {
    const module = await Module.findById(req.params.id).populate("courseId");
    if (!module) return res.status(404).json({ success: false, message: "Module not found" });

    const lesson = await Lesson.findOne({ moduleId: module._id });
    const quiz = await Quiz.findOne({ moduleId: module._id });

    res.status(200).json({
      success: true,
      data: { module, lesson, quiz }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user progress
router.get("/progress/:userId", async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ userId: req.params.userId }).populate("completedModules");
    if (!progress) {
      progress = await UserProgress.create({ userId: req.params.userId });
    }
    
    // Calculate total modules for stats
    const totalModules = await Module.countDocuments();
    
    res.status(200).json({
      success: true,
      data: progress,
      totalModules
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark module complete
router.post("/progress/complete", async (req, res) => {
  try {
    const { userId, moduleId } = req.body;
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
    }

    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
      // Basic streak logic (in a real app, calculate based on dates)
      progress.learningStreak += 1;
      progress.lastActive = new Date();
      await progress.save();
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get bookmarks
router.get("/bookmarks/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.params.userId }).populate("moduleId");
    res.status(200).json({ success: true, data: bookmarks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Toggle bookmark
router.post("/bookmarks", async (req, res) => {
  try {
    const { userId, moduleId } = req.body;
    const existing = await Bookmark.findOne({ userId, moduleId });
    
    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id);
      res.status(200).json({ success: true, message: "Bookmark removed", bookmarked: false });
    } else {
      await Bookmark.create({ userId, moduleId });
      res.status(200).json({ success: true, message: "Bookmark added", bookmarked: true });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- Future AI Routes Stub ---
router.post("/ai/quiz", (req, res) => res.json({ message: "AI Quiz generation coming soon" }));
router.post("/ai/notes", (req, res) => res.json({ message: "AI Notes generation coming soon" }));
router.post("/ai/interview", (req, res) => res.json({ message: "AI Interview coming soon" }));

export default router;
