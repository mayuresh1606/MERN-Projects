const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => console.log(`Mongodb connected with server : ${data.connection.host}`))
}

module.exports = connectDB