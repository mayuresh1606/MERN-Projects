import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import bodyParser from "body-parser";
import { connectDB } from "./db/connect.js";

dotenv.config();

const PORT = process.env.BACKEND_PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit:"30mb", extended: true }))

import userRouter from "./routes/user.js"
app.use("/user", userRouter);

app.listen(5000, async () => {
    try{
        await connectDB()
        console.log(`Server connected on port: ${PORT}`);
    }catch(err){
        console.error(err);
    }
})