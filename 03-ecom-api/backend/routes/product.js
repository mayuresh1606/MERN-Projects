const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/product");
const {isAuthenticated, authorizeRoles} = require("../middlewares/auth");
const router = express.Router();

router.route("/products").get(isAuthenticated, authorizeRoles("admin"), getAllProducts).post(isAuthenticated, createProduct);
router.route("/products/:id").patch(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProduct).get(isAuthenticated, getSingleProduct);

module.exports = router;