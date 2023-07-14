import express from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts.js";

const router = express.Router()

router.get("/", getPosts);
router.post("/", createPost)
router.delete("/:id", deletePost);

export default router;