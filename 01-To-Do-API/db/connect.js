const mongoose = require("mongoose");
require("dotenv").config();

const url = "mongodb+srv://MERN:MERN-PROJECTS@cluster0.olnvi.mongodb.net/01-Task-Manager?retryWrites=true&w=majority";

const connectDB = () => {
    return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    };

module.exports = connectDB;