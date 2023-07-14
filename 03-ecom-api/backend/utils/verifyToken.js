// Creating token and saving it in cookie...

const sendToken = async (user, statusCode, res) => {
    const token = await user.getJWTToken();

    const options = {
        expires:Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly:true
    }

    res.status(statusCode).cookie("token", token).json({success: true, token, user});
}

module.exports = sendToken;