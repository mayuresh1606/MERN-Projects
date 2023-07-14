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