const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create product - Admin
exports.createProduct = catchAsyncError( async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({success:true, product});
})

// Get All Products
exports.getAllProducts = catchAsyncError (async(req, res) => {
    const resultPerPage = 2;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find({}), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({success:true, products, productsCount, nbHits:products.length})
})

// Single product

exports.getSingleProduct = catchAsyncError (async (req, res, next) => {
    const product = await Product.findById({_id:req.params.id});
    if (!product){
        return next(new ErrorHandler(`Product not found with id: ${req.params.id}`, 404))
    }
    return res.status(200).json({success:true, product});
})

// Update product - Admin
exports.updateProduct = catchAsyncError( async (req, res, next) => {
    const {id} = req.params;
    let product = await Product.findById({_id:id});
    if (!product){
        return next(new ErrorHandler(`Product not found with id: ${req.params.id}`, 404))
    }
    product = await Product.findByIdAndUpdate({_id:id}, req.body, {runValidators:true, new:true, useFindAndModify:false});
    return res.status(200).json({success:true, product});
})

exports.deleteProduct = catchAsyncError( async (req, res, next) => {
    const product = await Product.deleteMany({}, {new:true});
    // const product = await Product.findByIdAndDelete({_id:req.params.id}, {new:true});
    if (!product){
        return next(new ErrorHandler(`Product not found with id: ${req.params.id}`, 404))
    }
    return res.status(200).json({success:true, product});
})