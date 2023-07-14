import express from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts.js";

const router = express.Router()


import { authenticateToken } from "../middlewares/authenticateToken.js";
router.get("/", authenticateToken, getPosts);

router.post("/", createPost)
router.delete("/:id", deletePost);

export default router;