const mongoose = require("mongoose");

const Categories = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name of category must be provided..."],
        maxLength:50
    }
})

module.exports = mongoose.model("Categories", Categories);