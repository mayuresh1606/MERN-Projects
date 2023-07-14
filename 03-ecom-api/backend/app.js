const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Route imports
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
// Error Handler middleware

const errorHandlerMiddleware = require("./middlewares/error");

app.use("/api/v1/", productRouter);
app.use("/api/v1/", userRouter);

app.use(errorHandlerMiddleware)

module.exports = app;