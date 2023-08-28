const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const userId=uuidv4().split('-')[0]
const UsherSchema = new mongoose.Schema({
     uniqueId:{
        type:String,
        default:userId
     },
    name:{
        type:String,
        required:[true,"Please provide your name"]
    },
    username:{
        type:String,
        required:[true,"Please provide your username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide your password"],
        unique:true
    },
    profilePicture:{
        type:String
    },
    verified:{
      type:Boolean,
      default:false
    }
},{timestamps:true})



UsherSchema.pre('save',async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

//creating a accesstoken
UsherSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { uniqueId: this.uniqueId, username: this.username},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
}

//creating refresh tokens
UsherSchema.methods.createRefreshToken = function (){
  return jwt.sign(
    { uniqueId: this.uniqueId, username: this.username},
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.refreshExpiry,
    }
  )
}


//creating an otp
UsherSchema.methods.GenerateOTP = function (){
    let otp=""
      for(i=0;i<=3;i++){
       let rand= Math.floor(Math.random()*9)
       otp+=rand
      }
      return otp
}



//comparing the function
UsherSchema.methods.comparePassword = async function (canditatePassword){
  const isMatch = await bcrypt.compare(canditatePassword,this.password)
  return isMatch
}




module.exports = mongoose.model("user",UsherSchema)