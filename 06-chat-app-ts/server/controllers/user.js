import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name){
            return res.status(401).json({message: `Name is required`})
        }

        if (!email){
            return res.status(401).json({message: `email is required`})
        }

        if (!password){
            return res.status(401).json({message: `password is required`})
        }

        const user = await User.create(req.body)

        return res.status(200).json({user, message: `User created successfully!`})
    } catch (error) {
        return res.status(500).json({error, message: "Internal Server Error!"})
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        console.log(email, password, req.body);
        const user = await User.findOne({ email });

        let isMatch;
        if (user){
            isMatch = await user.comparePassword(password)
            if (!isMatch){
                return res.status(401).json({ message: "Invalid Credentials!"})
            }
            let key = process.env.JWT_SECRET_KEY;

            const token = jwt.sign({ id: user._id, email: user.email }, key, { expiresIn: "3d" })

            return res.status(200).json({ message: "Logged In successfully!", token })
        }
        
        return res.status(404).json({message: "User Not Found"});
    }catch(error){
        console.error(error)
    }
}