import Post from "../models/Post.js";


export const getPosts = async (req, res) => {
    try {
        let posts = await Post.find({});
        console.log(req.user, 'USER')
        posts = await posts.filter((post) => post.creator === req.user.userName)
        return res.status(200).json({posts, length:posts.length});
    } catch (err) {
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