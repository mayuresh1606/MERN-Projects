const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Task must have a name"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("Task", TaskSchema);