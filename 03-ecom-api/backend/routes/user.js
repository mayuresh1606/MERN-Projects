const express = require("express");
const { registerUser, getAllUsers, deleteUser, loginUser, logotUser, updateUser, forgotPassword } = require("../controllers/user");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logotUser);

router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(deleteUser).patch(updateUser);
router.route("/users/password/forgot").post(forgotPassword);

module.exports = router;