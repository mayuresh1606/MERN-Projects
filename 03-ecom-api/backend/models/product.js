const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name must be provided..."],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Product description must be provided..."]
    },
    price:{
        type:Number,
        required:[true, "Price must be provided..."],
        maxLength:[8, "Price cannot exceed more than 8 digits..."]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    primaryCategory:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:[true, "category must be provided..."],
        default:this.primaryCategory
    },
    stock:{
        type:Number,
        required:[true, "Please provide in stock of product..."],
        maxLength:[4, "Stock shouldn't exceed 4 digits..."],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);