import express from "express"
import { createUser, loginUser } from "../controllers/user.js";
// import { authorizeUser }

const router = express.Router();

router.post("/create", createUser)

router.post("/login", loginUser)

export default router;