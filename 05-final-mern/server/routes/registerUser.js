import express from "express"
import { addToFollowing, getUser, getUsersSearch, registerUser, removeFollower, removeFollowing } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/registerUser.js";
import { getRegisteredUser } from "../controllers/registerUser.js";
import { deleteUser } from "../controllers/registerUser.js";

const router = express.Router()

router.get("/", getRegisteredUser)
router.get("/username/:userName", getUser)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.delete("/:id", deleteUser)
router.get("/search", getUsersSearch)

// following related
router.patch("/follow/:id", addToFollowing)
router.patch("/removeFollower/:id", removeFollower);
router.patch("/removeFollowing/:id", removeFollowing);

export default router;