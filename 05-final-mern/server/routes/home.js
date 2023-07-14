import express from "express"
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const posts = await Post.find({});
        return res.status(200).json({posts, length: posts.length});
    }catch(err){
        return res.status(500).json({err, message:"Internal server error."})
    }
})

export default router;