import express from "express";
import { createPost, decreaseLike, deletePost, getHomePosts, getPosts, increaseLike, updateComments } from "../controllers/posts.js";

const router = express.Router()


import { authenticateToken } from "../middlewares/authenticateToken.js";
router.get("/", authenticateToken, getPosts);
router.get("/home", authenticateToken, getHomePosts);

router.post("/", createPost)
router.delete("/:id", deletePost);
router.patch("/updateComments/:id", updateComments);
router.patch("/increaseLike/:id", increaseLike);
router.patch("/decreaseLike/:id", decreaseLike);

export default router;