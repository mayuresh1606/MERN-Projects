const express = require("express");
const app = express();
const connectDB = require("./db/connect");

require("express-async-errors")
require("dotenv").config();

const productsRouter = require("./routes/product");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use("/api/v1/products/", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`App listening on port ${port}...`);
    })
}

start();