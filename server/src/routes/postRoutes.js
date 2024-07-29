import express from "express";
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus,
} from "../controllers/postController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Public routes
router.get("/posts", getAllPosts);
router.get("/posts/:postId", getPostById);

// Protected routes (require authentication)

router.post("/upload", upload.array("notes", 5), createPost);
router.patch("/posts/:postId", upload.array("notes", 5), updatePost);
router.delete("/posts/:postId", deletePost);
router.patch("/posts/:postId/toggle-publish", togglePublishStatus);

export default router;
