import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPosts = async (req, res) => {
    try {
        let posts = await Post.find({ creator: req.user.userName });
        return res.status(200).json({posts, length:posts.length});
    } catch (err) {
        return res.status(500).json({err, message: "Internal server error."})
    }
}

export const getHomePosts = async (req, res) => {
    try{
        const { userName } = req.user
        const tempUser = await User.findOne({userName})
        const userFollowingList = tempUser.followingList
    
        const posts = await Post.find({creator: [...userFollowingList]})
        return res.status(200).json({userName, posts})
    }catch(err){
        return res.status(500).json({err, message: "Internal server error."})
    }
}


export const createPost = async (req, res) => {
    try{
        const post = await Post.create(req.body)
        return res.status(201).json({post, message:`Post was created successfully by ${post.creator}`})
    }catch(err){
        return res.status(500).json({err, message: "Internal server error."})
    }
}

export const deletePost = async (req, res) => {
    try{
        const post = await Post.findByIdAndDelete({_id:req.params.id})
        return res.status(202).json({post, message:`Post by user ${post.creator} deleted successfullly! `})
    }catch(err){
        return res.status(500).json({err, message:"Internal Server Error."})
    }
}

export const increaseLike = async (req, res) => {
    try{
        const { id } = req.params;
        const { userName } = req.body;
        const post = await Post.updateOne({_id:id}, {$inc:{ likeCount: 1 }, $push: { likedBy: userName }});
        return res.status(200).json({post, message: "Increased like count"})
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."})
    }
}

export const decreaseLike = async (req, res) => {
    try{
        const { id } = req.params;
        const { userName } = req.body;
        const post = await Post.updateOne({_id:id}, {$inc:{ likeCount: -1 }, $pull: { likedBy: userName }});
        return res.status(200).json({post, message: "Decreased like count"})
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."})
    }
}