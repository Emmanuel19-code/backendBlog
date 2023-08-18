const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const OtpSchema = new mongoose.Schema({
    owner:{
        type:String,
        ref:'user'
    },
    otpvalue:{
        type:String,
        required:[true,"Please provide the detail"]
    }
},{timestamps:true})

//function to hash the OTP
OtpSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10)
  this.otpvalue = await bcrypt.hash(this.otpvalue, salt)
})

//function to  compare the OTP
OtpSchema.methods.compareToken = async function (candidateToken) {
  console.log(candidateToken);
  const isMatch = await bcrypt.compare(candidateToken, this.otpvalue)
  return isMatch
}
//UsherSchema.methods.comparePassword = async function (canditatePassword){
//  const isMatch = await bcrypt.compare(canditatePassword,this.password)
//  return isMatch
//}

module.exports = mongoose.model("storeOTP",OtpSchema)