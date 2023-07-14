const express = require("express");
const router = express.Router();
const Task = require("../models/Task")
const { CustomAPIError } = require("../error/custom-api-error");

require("express-async-errors");

router.route("/").get(async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
    catch(err){
        console.log(err);
    }
}).post(async(req, res) => {
    try{
        const {taskName} = req.body
        if (!taskName){
            throw new CustomAPIError("Task name is required...", 401);
        }
        const task = await Task.create(req.body)
        res.status(200).json({task})
    }
    catch(err){
        console.log(err);
    }
})


router.route("/:id").get( async (req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findOne({_id:id});
        res.status(200).json({task})
    }
    catch(err){
        console.log(err);
    }
}).patch(async(req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findOneAndUpdate({_id: id}, req.body, {new:true});
        res.status(200).json({task})
    }
    catch(err){
        console.log(err);
    }
}).delete(async(req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findOneAndDelete({_id:id});
        res.status(200).json({task})
    }catch(err){
        console.log(err);
    }
})

module.exports = router;