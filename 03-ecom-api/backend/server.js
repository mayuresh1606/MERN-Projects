const app = require("./app");

const dotenv = require("dotenv");
const connectDB = require("./config/connect");

// Handling Uncaught Error
process.on("uncaughtException", err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})

// Config
dotenv.config({path:"backend/config/.env"});

// Database connect
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
})

// Unhandled Promise Rejection

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})