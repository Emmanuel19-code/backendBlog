const jwt = require("jsonwebtoken")
const tryCatch = require("../ErrorHandlers/TryCatch")

const Authentication = tryCatch( 
  async (req,res,next) =>{
  const {token} = req.cookies
   if(!token){
     return res.json({
      msg:"Please Login into your account"
     })
   }
  const payload=jwt.verify(token,process.env.JWT_SECRET)
   req.user = {uniqueId:payload.uniqueId,username:payload.username}
  next()
}
)


const authorizePermision =tryCatch(
  async(req,res,next) =>{
   const role = req.user.role
   if(role !== "Admin"){
   return res.json({
      msg:"You don't have permission to access this route"
    })
   }
   next();
}
) 


const VerifyUser = tryCatch(
  async (req,res,next)=>{
     const {otpcookie} = req.cookies
     const payload = jwt.verify(otpcookie,process.env.JWT_SECRET)
     req.user = {uniqueId:payload.uniqueId,username:payload.username}
     next()
  }
)

const RequestNewPassword = tryCatch(
  async (req,res,next)=>{
     const {passwordToken} = req.cookies
     const payload = jwt.verify(passwordToken,process.env.JWT_SECRET)
     req.user = {uniqueId:payload.uniqueId,username:payload.username}
     next()
  }
)

module.exports = {
  Authentication,
  authorizePermision,
  VerifyUser,
  RequestNewPassword
}