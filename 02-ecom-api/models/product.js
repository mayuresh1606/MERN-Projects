const mongoose = require("mongoose");
const Categories = require("./categories");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name must be provided..."],
        maxLength:50
    },
    category:{
        type:String,
        required:[true, "Product category must be provided..."],
        maxLength:50
    },
    subCategory:{
        type:String,
        required:[true, "Product subCategory must be provided..."],
        maxLength:50
    },
    price:{
        type:Number,
        required:[true, "Price must be provided..."],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    description:{
        type:String,
        required:false
    }
})


module.exports = mongoose.model("Product", productSchema)