import jwt from "jsonwebtoken"

export const authorizeUser = (req, res, user) => {
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error, message: "Internal Server Error!" })
    }
}