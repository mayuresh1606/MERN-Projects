import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null){
        return res.status(401).json({message: "Authorization token not present."})
    }
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Token expired!"});
        req.user = user;
        next();
    })
}