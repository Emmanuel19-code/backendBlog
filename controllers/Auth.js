const tryCatch = require("../ErrorHandlers/TryCatch");
const storeOTP = require("../models/OtpSchema");
const user = require("../models/UsherSchema")
const { StatusCodes } = require('http-status-codes');


const SignUp = tryCatch(
    async (req,res) =>{
        const {name,email,password,username} = req.body
         if(!name || !email || !password || !username){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please Provide the missing detail"
            })
            
         }
       const isUsername = await user.findOne({username})
       const isEmail = await user.findOne({email})
        if(isUsername){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"A user with this username exist"
            })
        }
         if(isEmail){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"A user with this email exist"
            })
        }
        const userCreated = await user.create(req.body)
        if(!userCreated){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Could not create please try again"
            })
        }
        const token = userCreated.createJWT();
        const OTP = userCreated.GenerateOTP();
        const createOTP = await storeOTP.create({
            owner:userCreated.uniqueId,
            otpvalue:OTP
        })
        res.cookie("otpcookie",token)
        res.status(StatusCodes.CREATED).json({
            msg:"User created",
            otp:OTP
        })
    }
)


const VerifyAccount= tryCatch(
    async (req,res) =>{
        const {otp} = req.body
        const userId = req.user.uniqueId
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please this user does not exist"
            })
        }
      const isUser = await storeOTP.findOne({userId})
      if(!isUser){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Please user does not exist"
        })
      }
     const isMatch = await isUser.compareToken(otp)
      if(!isMatch){
        res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Invalid token"
        })
      }
      const verifiedUser = await user.findOne({user})
      verifiedUser.verified = true
      verifiedUser.save()
      res.status(StatusCodes.OK).json({
        msg:"You have been verified successfully"
      })
    }
)

const Login = tryCatch(
    async (req,res) =>{
        const {username,password} = req.body
        if(!username || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please provide the information"
            })
        }
        const isUser = await user.findOne({username})
        if(!isUser){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"User is not found"
            })
        }
        const isMatch =await isUser.comparePassword(password)
        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg:"Please provide the correct details"
            })
        }
        const token = isUser.createJWT();
        res.cookie("token",token)
        res.status(StatusCodes.OK).json({
            username:username,
            uniqueId:isUser.uniqueId
        })
    }
)


const ForgotPassword = tryCatch(
    async (req,res) =>{
        const {username} = req.body
        if(!username){
            return res.status(StatusCodes.NOT_FOUND).json({
                msg:"field cannot be empty"
            })
        }
        const isUser = await user.findOne({username})
        if(!isUser){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"User cannot be found"
            })
        }
        const token = isUser.createJWT();
         res.cookie("otpcookie",token)
        res.status(StatusCodes.OK).json({
            msg:"ohk"
        })
    }
)

const createNewPassword = tryCatch(
    async (req,res)=>{
        const {newpassword} = req.body
        const uniqueId = req.user.uniqueId
        if(!newpassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"field cannot be empty"
            })
        }
       const isUser = await user.findOne({uniqueId})
       const isMatch =await isUser.comparePassword(newpassword);
       if(isMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"New password and old cannot be the same",
            isMatch:isMatch
        })
       }
       isUser.password = newpassword
       isUser.save()
       res.status(StatusCodes.CREATED).json({
        msg:"Password has been updated successfully"
       })
    }
)


const ChangeProfilePicture = tryCatch(
    async (req,res)=>{
        
    }
)


const LogOut = tryCatch(
    async(req,res)=>{
        res.cookie("token","");
        res.status(StatusCodes.OK).json({
            msg:"You have been logged out"
        })
    }
)


module.exports={
    SignUp,
    VerifyAccount,
    Login,
    ForgotPassword,
    createNewPassword,
    LogOut
}