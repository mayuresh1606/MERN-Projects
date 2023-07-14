import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./connect.js";


const app = express();


app.use(cors())
app.use(bodyParser.json({limit: "30mb", extended:true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))

import userRouter from "./routes/registerUser.js"
app.use("/user", userRouter)

import postRouter from "./routes/post.js"
app.use("/post", postRouter)

import homeRouter from "./routes/home.js"
app.use("/", homeRouter)


const CONNECTION_URL = `mongodb+srv://mayuresh_1606:${process.env.MONGO_PASSWORD}@mern.h62t5qm.mongodb.net/?retryWrites=true&w=majority`
const start = async () => {
    try{
        await connectDB(CONNECTION_URL);
        app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`))
    }catch(err){
        console.log("Something wrong with connection!!!")
    }
}

start();