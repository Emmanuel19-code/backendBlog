const CustomError = require("./CustomError")



const errorHandler = (error, req, res, next) => {
   if(error instanceof CustomError) {
    return res.status(error.statusCode).json({ msg: error.message })
  }
   res.status(500).json("Something went wrong")
};


module.exports = errorHandler;
