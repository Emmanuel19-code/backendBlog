const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodeMailerConfig');


const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Emmanuel Blog" generalproject4@gmail.com', // sender address
    to,
    subject,
    html,
  });
  } catch (error) {
    console.log("An error occured could not send mail");
  } 
};

module.exports = sendEmail;
