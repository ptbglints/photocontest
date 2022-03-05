"use strict";
const nodemailer = require("nodemailer");

async function sendConfirmMail(req, res, next) {
    try {
        if (req.result) {

            const mailUserName = process.env.MAIL_USERNAME
            const mailPassword = process.env.MAIL_PASSWORD
            const mailHost = process.env.MAIL_HOST
            const mailPort = process.env.MAIL_PORT

            // create reusable transporter object using the default SMTP transport
            let transporterSMTP = nodemailer.createTransport({
                host: mailHost,
                port: mailPort,
                auth: {
                    user: mailUserName,
                    pass: mailPassword,
                },
            });

            const sendMailOptions = {
                from: '"Yo!Photo 👻" <arman@yophoto.com>', // sender address
                to: req.result.email, // list of receivers
                subject: `Hello ${req.result.userName} ✔`, // Subject line
                text: "Hello world?", // plain text body
                html: `<b>Hello ${req.result.userName}, to confirm your email and activate your account, 
                    please click link below:</b><br><br>
                    <a href="${req.protocol}://${req.headers.host}/api/users/activate?token=${req.result.tokenActivation}">Confirm your email</a>`, // html body
            }

            transporterSMTP.verify(function (error, success) {
                if (error) next(err)
            })

            transporterSMTP.sendMail(sendMailOptions, (error, success) => {
                // if error, throw the error
                if (error) throw new Error(error)

                // email sent succesfully
                console.log(success)
                next()
            })

        } else {
            throw new Error('Cannot process mailer. req.result not found.')
        }
    } catch (err) {
        throw new Error(err)
    }


}

module.exports = {
    sendConfirmMail
}