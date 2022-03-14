"use strict";
const nodemailer = require("nodemailer");

const mailUserName = process.env.MAIL_USERNAME
const mailPassword = process.env.MAIL_PASSWORD
const mailFromAddress = '"Fred Foo 👻" <foo@example.com>'
const mailToAddress = process.env.MAIL_TO_ADDRESS || "bar@example.com, baz@example.com" 

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporterSMTP = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587, // default: 587
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailUserName, // generated ethereal user
      pass: mailPassword, // generated ethereal password
    },
  });

  let transporterGMAIL = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: mailUserName,
      pass: mailPassword,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  // send mail with defined transport object
  let info = await transporterSMTP.sendMail({
    from: mailFromAddress, // sender address
    to: mailToAddress, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendMail = () => main().catch(console.error);

exports.module = {
    sendMail
}
