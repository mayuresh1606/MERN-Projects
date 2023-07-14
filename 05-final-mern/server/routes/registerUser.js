import express from "express"
import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/registerUser.js";
import { getRegisteredUser } from "../controllers/registerUser.js";
import { deleteUser } from "../controllers/registerUser.js";

const router = express.Router()

router.get("/", getRegisteredUser)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.delete("/:id", deleteUser)

export default router;