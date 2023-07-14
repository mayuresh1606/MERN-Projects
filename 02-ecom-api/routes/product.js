const Product = require("../models/product");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { query } = require("express");
const router = express.Router();

router.route("/").get(async(req, res) => {
    const {sort,subCategory, page, price, name, fields, category} = req.query;
    let result = Product.find({});
    const queryObject = {};

    if (name){
        queryObject.name = {$regex:name, $options:"i"};
    }

    // result = result.find(queryObject);
    if (price){
        let operators = ['<=', ">=", "<", ">"];
        let operatorMap = {
            "<=":'$lte',
            ">=":'$gte',
            "<":'$lt',
            ">":'$gt'
        }
        operators.forEach((operator) => {
            if (!queryObject.price){
                if (price.includes(operator)){
                    let newOperator = operatorMap[operator];
                    let keyValue = price.split(operator)[1];
                    queryObject.price = {[newOperator]:keyValue}
                }
            }
        })
    }
    if (category){
        queryObject.category = {$regex:category, $options:"i"}
    }
    if (subCategory){
        queryObject.subCategory = {$regex:subCategory, $options:"i"}
    }
    result = result.find(queryObject);
    if (fields){
        let newFields = fields.split(",").join("");
        result = result.select(newFields);
    }
    if (page){
        let pageNo = Number(page) - 1;
        let limit = 2;
        let skipper = Number(pageNo) * Number(limit)
        result = result.skip(skipper).limit(limit)
    }
    const product = await result;
    res.status(StatusCodes.OK).json({product, nbHits:product.length});
}).post(async(req, res) => {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
})

router.route("/:id").get(async (req, res) => {
    const product = await Product.find({_id:req.params.id});
    res.status(StatusCodes.OK).json({product});
}).patch(async (req, res) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate({_id:id}, req.body, {new:true, runValidators:true});
    res.status(StatusCodes.CREATED).json({product});
}).delete(async (req, res) => {
    // const product = await Product.deleteMany({name:{$regex:"lenovo", $options:"i"}});
    const product = await Product.findByIdAndRemove({_id:req.params.id}, {new:true});
    res.status(StatusCodes.OK).json({product});
})

module.exports = router;