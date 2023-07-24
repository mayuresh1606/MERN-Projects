import User from "../models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const getRegisteredUser = async (req, res) => {
    try{
        const user = await User.find({})
        return res.status(200).json({user, length:user.length})
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."})
    }
}

export const getUsersSearch = async (req, res) => {
    try{
        const { search } = req.query;
        console.log(search);
        // const users = await User.aggregate([{
        //     $search: {
        //         text:{
        //             query: search,
        //             path: "userName"
        //         }
        //     }
        // }])
        const users = await User.find({ $text: { $search: search } })
        // const users = await User.find({ userName: { $regex: search }})
        return res.status(200).json({users, length: users.length})
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."})
    }
}

export const getUser = async (req, res) => {
    try{
        const { userName } = req.params;
        const user = await User.findOne({userName})
        return res.status(200).json({ user })
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."})
    }
}

export const registerUser = async (req, res) => {
    try{
        const {email, firstName, lastName, password, userName} = req.body;

        if (email && firstName && lastName && password && userName){
            const user = await User.create(req.body)
            return res.status(201).json({user, message: `User ${firstName} created successfully...`})
        }
        return res.status(400).json({message: "Some of the following fields is missing: firstName, lastName, email, userName, password."})
    }catch(err){
        if (err.keyValue.userName){
            return res.status(403).json({err, message: `Username ${err.keyValue.userName} already exists!`})
        }
        if (err.keyValue.email){
            return res.status(403).json({err, message: `Email ${err.keyValue.email} already exists!`})
        }
        return res.status(500).json({err, message: "Internal Server Error"});
    }
}


export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params
        console.log(id)
        const user = await User.findOneAndDelete({_id:id});
        console.log(user)
        if (user === null){
            return res.status(404).json({message: "User not found!"})
        }
        return res.status(202).json({user, message:`User: ${user.firstName} deleted Successfully`})
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."});
    }
}

export const loginUser = async (req, res) => {
    try{
        const { password, userName } =  req.body;
        if (userName){
            let isMatch;
            let user;
            if (userName.includes("@")) {
                user = await User.findOne({email:userName});
            }else{
                user = await User.findOne({userName});
            }
            if (user !== null){
                isMatch = await user.comparePassword(password)
            }else if(user === null){
                return res.status(404).json({message: "User not found"})
            }
            if (isMatch){
                let newUser = await {userName: user.userName}
                const token = jwt.sign(newUser, process.env.JWT_SECRET, { expiresIn: "15d" })
                return res.status(200).json({token, message: "User logged in..."});
            }
            else return res.status(401).json({message: "Invalid Credentials!"})
        }
    }catch(err){
        return res.status(500).json({err, message:"Internal server error."})
    }
}

// following related:

export const addToFollowing = async (req, res) => {
    try{
        // id of user who's followers are to be updated...
        const { id } = req.params;

        // userName of user who's followingList is to be updated...
        // userName2 of user who's followersList is to be updated...
        const {userName, userName2} = req.body
        let user = await User.updateOne({_id: id}, {$push: { followersList: userName }});

        // now we need to update followingList of user sending follow request
        await User.updateOne({userName}, { $push: { followingList: userName2 }})

        return res.status(201).json({user, message: `User ${userName2} added to following`});
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."});
    }
}


export const removeFollower = async (req, res) => {
    try{
        // id of user who is going to remove follower
        const { id } = req.params;
        // userName of user who is going to be removed from followers list
        // userName2 of user who is going to be removed from following list
        const { userName, userName2 } = req.body;
        let user = await User.updateOne({_id: id}, { $pull: { followersList: userName } });
    
        await User.updateOne({userName}, {$pull: { followingList: userName2 }})

        return res.status(202).json({user, message:`User ${userName} removed from followers list`});
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error!"})
    }
}

export const removeFollowing = async (req, res) => {
    try{
        // id of user who's followingList is to be updated
        const {id} = req.params;
        // userName of user who is to be removed from followersList
        // userName2 of user who is to be removed from followingList
        const {userName, userName2} = req.body;
    
        const user = await User.updateOne({_id: id}, {$pull: { followersList: userName }});

        await User.updateOne({userName}, {$pull: { followingList: userName2 }});
        return res.status(202).json({user, message: `User ${userName2} removed from followingList!`})
    
    }catch(err){
        return res.status(500).json({err, message: "Internal server error!"});
    }
}