import express from "express";
import { createPost, deletePost, getHomePosts, getPosts, increaseLike } from "../controllers/posts.js";

const router = express.Router()


import { authenticateToken } from "../middlewares/authenticateToken.js";
router.get("/", authenticateToken, getPosts);
router.get("/home", authenticateToken, getHomePosts);

router.post("/", createPost)
router.delete("/:id", deletePost);
router.patch("/increaseLike/:id", increaseLike);

export default router;