const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodeMailerConfig');

const sendEmail = async ({ to, subject, html }) => {
 
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"StarCLinic" generalproject4@gmail.com', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
