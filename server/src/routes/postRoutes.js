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
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/posts", getAllPosts);
router.get("/posts/:postId", getPostById);

// Protected routes (require authentication)
router.use(verifyJWT);

const upload_many = upload.fields([
    { name: "notes1", maxCount: 1 },
    { name: "notes2", maxCount: 1 },
    { name: "notes3", maxCount: 1 },
    { name: "notes4", maxCount: 1 },
    { name: "notes5", maxCount: 1 },
]);

router.post("/upload", upload_many, createPost);
router.patch("/posts/:postId", upload.array("notes", 5), updatePost);
router.delete("/posts/:postId", deletePost);
router.patch("/posts/:postId/toggle-publish", togglePublishStatus);

export default router;
