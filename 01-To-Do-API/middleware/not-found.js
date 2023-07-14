const notFound = (err, req, res, next) => {
    try{
        res.status(404).json({msg:"This route does not exist..."})
        next()
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later..."})
    }
}

module.exports = notFound;