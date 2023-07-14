import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    caption:{
        type:String
    },
    location:{
        type:String,
        default:null
    },
    creator:{
        type:Schema.Types.String,
        ref:"User"
    },
    tags:[{
        type:String,
        default:[]
    }],
    likeCount:{
        type:Number,
        default:0
    },
    selectedFile:{
        type:String,
        default:""
    }
})

const Post = mongoose.model("Post", postSchema)

export default Post;