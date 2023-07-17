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

export const registerUser = async (req, res) => {
    try{
        const {email, firstName, lastName, password, userName} = req.body;

        if (email && firstName && lastName && password && userName){
            const user = await User.create(req.body)
            console.log(user);
            return res.status(201).json({user, message: `User ${firstName} created successfully...`})
        }
        return res.status(400).json({message: "Some of the following fields is missing: firstName, lastName, email, userName, password."})
    }catch(err){
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
            let user;
            if (userName.includes("@")) {
                user = await User.findOne({email:userName});
            }else{
                user = await User.findOne({userName});
            }
            const isMatch = await user.comparePassword(password)
            if (isMatch){
                let newUser = await {userName: user.userName}
                const token = jwt.sign(newUser, process.env.JWT_SECRET)
                return res.status(200).json({token, message: "User logged in..."});
            }
            // if (isMatch) return 
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
        const {userName} = req.body
        let user = await User.findById(id);

        // current followers before updating
        let tempFollowers = user.followersList

        // update userName into followers List
        await User.findByIdAndUpdate(id, {followersList: [...tempFollowers, userName]});

        // now we need to update followingList of user sending follow request
        const newUser = await User.findById(id)

        // userName of user who he/she has followed
        const newUserName = newUser.userName;
        let tempFollowingUser = await User.findOne({userName});
        tempFollowingUser.followingList.push(newUserName)

        // updating userName into followingList
        await User.findOneAndUpdate({userName}, {followingList: tempFollowingUser.followingList});
        return res.status(201).json({newUser, message: "User added to following"});
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error."});
    }
}


export const removeFollower = async (req, res) => {
    try{
        const { id } = req.params;
        const { userName } = req.body;
        const user = await User.findById(id);
    
        let tempUserName = user.userName;
        let tempFollowersList = user.followersList.filter(userNames => userNames !== userName);
        await User.findByIdAndUpdate(id, {followersList: tempFollowersList});
    
        const tempUser = await User.findOne({userName});
        const tempFollowingList = tempUser.followingList.filter((user) => user !== tempUserName)
        await User.findOneAndUpdate({userName}, {followingList: tempFollowingList});
    
        const newUser = await User.findById(id);
        return res.status(202).json({newUser, message:`User ${userName} removed from followers list`});
    }catch(err){
        return res.status(500).json({err, message: "Internal Server Error!"})
    }
}

export const removeFollowing = async (req, res) => {
    try{
        const {id} = req.params;
        const {userName} = req.body;
    
        const user = await User.findById(id);
        const tempUserName = user.userName;
        let tempFollowingList = user.followingList.filter(user => user !== userName);
        await User.findByIdAndUpdate(id, {followingList: tempFollowingList});
    
        const newUser = await User.findOne({userName});
        const tempFollowersList = newUser.followersList.filter(user => user !== "shruti0711");
        await User.findOneAndUpdate({userName}, {followersList: tempFollowersList});
    
        return res.status(202).json({user, message: `User ${userName} removed from followingList!`})
    }catch(err){
        return res.status(500).json({err, message: "Internal server error!"});
    }
}