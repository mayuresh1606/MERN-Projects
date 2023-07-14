require("express-async-errors");
require("dotenv").config();


const express = require("express");
const connectDB = require("./db/connect");
const taskRouter = require("./router/task")
const notFound = require("./middleware/not-found")
const errorHandler = require("./middleware/error-handler");
const app = express();

app.use(express.json());
app.use("/api/v1/tasks", taskRouter);

app.use("*", notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;


const start = async () => {
    try{
        await connectDB();
        app.listen(port, () => console.log(`Server listening on port: ${port}...`));
    }catch(err){
        console.log(err);
    }
}

start();