const validator = require('validator');


const emailValidation =(email)=>{
 const valid =validator.isEmail(email);
 return valid
}

module.exports = {
    emailValidation
}