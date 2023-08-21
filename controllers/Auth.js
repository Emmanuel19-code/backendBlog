const tryCatch = require("../ErrorHandlers/TryCatch");
const storeOTP = require("../models/OtpSchema");
const user = require("../models/UsherSchema");
const { StatusCodes } = require('http-status-codes');
const { sendOneTimePassword } = require("../utils/MailNotification");
const BadRequest = require("../ErrorHandlers/BadRequest");


const SignUp = tryCatch(
    async (req,res) =>{
        const {name,email,password,username,profilePicture} = req.body
       console.log(req.body);
      if(!name || !email || !password || !username){
         return res.status(StatusCodes.BAD_REQUEST).json({
             msg:"Please Provide the missing detail"
         })   
      }
     const isUsername = await user.findOne({username:username})
     const isEmail = await user.findOne({email:email})
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
     
     const OTP = userCreated.GenerateOTP();
     const createOTP = await storeOTP.create({
         owner:userCreated.uniqueId,
         otpvalue:OTP
     })
     sendOneTimePassword({
         name:userCreated.name,
         email:userCreated.email,
         verificationToken:OTP
     })
     const token = userCreated.createJWT();
     console.log(token);
     res.cookie("otpcookie",token)
      res.status(StatusCodes.CREATED).json({
          msg:"User created",
          otp:OTP,
          otpcookie:token
      })
    }
)


const VerifyAccount= tryCatch(
    async (req,res) =>{
        const {otp} = req.body
       const userId = req.user.uniqueId
        if(!userId){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please this user does not exist"
            })
        }
        if(otp.length!=4){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"token length must be 4"
            })
        }
       const isUser = await storeOTP.findOne({uniqueId:userId})
       console.log(isUser);
       if(!isUser){
         return res.status(StatusCodes.BAD_REQUEST).json({
             msg:"Please Request a new OTP"
         })
       }
      const isMatch = await isUser.compareToken(otp)
      console.log(isMatch);
       if(!isMatch){
        return res.status(StatusCodes.BAD_REQUEST).json({
             msg:"Invalid token"
         })
       }
       const verifiedUser = await user.findOne({uniqueId:userId})
       if(verifiedUser){
          verifiedUser.verified = true
       verifiedUser.save()
       }
       const delotp = await storeOTP.deleteOne({uniqueId:userId})
       res.cookie("otpcookie","")
    res.status(StatusCodes.OK).json({
        msg:"You have been verified successfully",
      })
    }
)

const Login = tryCatch(
    async (req,res) =>{
        const {username,password} = req.body
        console.log(req.body);
        if(!username || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please provide the information"
            })
        }
        const isUser = await user.findOne({username:username})
        if(!isUser){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"User is not found"
            })
        }
        if(isUser.verified!= true){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please verify your account"
            })
        }
        const isMatch =await isUser.comparePassword(password)
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"Please provide the correct details"
            })
        }
        const token = isUser.createJWT();
        res.cookie("token",token,{
            httpOnly:true
        })
        res.status(StatusCodes.OK).json({
            username:username,
            uniqueId:isUser.uniqueId,
            profilePicture:isUser.profilePicture,
            message:"Authentication Successful",
            token:token
        })
    }
)


const ForgotPassword = tryCatch(
    async (req,res) =>{
        const {userInfo} = req.body
        console.log(req.body);
        if(!userInfo){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"field cannot be empty"
            })
        }
        const isUser = await user.findOne({username:userInfo})
        if(!isUser){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"User not found"
            })
        }
        const token = isUser.createJWT();
        res.cookie("otpcookie",token)
        res.status(StatusCodes.OK).json({
            msg:"ohk",
            otpcookie:token
        })
    }
)

const createNewPassword = tryCatch(
    async (req,res)=>{
        const {newpassword} = req.body
        console.log(newpassword);
        const uniqueId= req.user.uniqueId
        if(!newpassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg:"field cannot be empty"
            })
        }
      const isUser = await user.findOne({uniqueId:uniqueId})
      console.log(isUser);
      const isMatch =await isUser.comparePassword(newpassword);
        if(isMatch){
         return res.status(StatusCodes.BAD_REQUEST).json({
             msg:"New password and old cannot be the same",
         })
        }
       isUser.password = newpassword
       isUser.save()
       res.cookie("optcookie","")
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