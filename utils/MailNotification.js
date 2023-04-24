const sendEmail = require('./sendEmail');

const sendOneTimePassword = async ({
  name,
  email,
  verificationToken,
}) => {

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
    This is your email verification token ${ verificationToken} 
    `,
  });
};




const ResetPasswordToken = ({
 name,
 email,
 verificationToken
}) =>{
   return sendEmail({
     to:email,
     subject: 'Password Reset',
     html:`<h4>Hello, ${name} </h4>
      This is your password reset token ${verificationToken}
     `
   })
}


module.exports ={
sendOneTimePassword,
ResetPasswordToken
} 