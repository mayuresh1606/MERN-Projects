const { CustomAPIError } = require("../errors")
const {StatusCodes} = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    let customErr = {
        statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
        message:"Something went wrong please try again later..."
    }

    if (err instanceof CustomAPIError){
        return res.status(CustomAPIError.statusCode).json({msg:CustomAPIError.message});
    }
    console.log(err);
    // return res.status(customErr.statusCode).json({msg:customErr.message});
    return res.status(customErr.statusCode).json({err})
}

module.exports = errorHandler;