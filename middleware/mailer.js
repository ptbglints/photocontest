"use strict";
const nodemailer = require("nodemailer");
var appRoot = require('app-root-path');
const path = require('path')
const fs = require('fs/promises')

const tokenFile = 'token.json'
const tokenDir = `${appRoot}/tmp/oauth`
const tokenFullPath = path.join(tokenDir, tokenFile)

async function ReadAccessTokenFromFile() {
    try {
        const data = await fs.readFile(tokenFullPath)
        // console.log(data.toString());
        return JSON.parse(data.toString())
    } catch (err) {
        console.log('Token file not exist.')
    }
}

async function StoreAccessTokenToFile(envAccTok, envAccExp) {
    try {
        await fs.mkdir(tokenDir, { recursive: true })
        const json = {
            accessToken: envAccTok,
            expires: parseInt(envAccExp)
        }
        
        try {
            // create file if not exist
            await fs.writeFile(tokenFullPath, JSON.stringify(json), { flag: 'wx' })
            console.log('Token file created.')
        } catch (err) {
            // if file exist, check the expire date
            const tokenInFile = await ReadAccessTokenFromFile()
            // if expire date is different, update the file
            if (parseInt(tokenInFile.expires) <= parseInt(envAccExp)) {
                await fs.writeFile(tokenFullPath, JSON.stringify(json), { flag: 'w' })
                console.log('Token file is outdated and has been updated.')
            } else (console.log('Token file is exist and valid. Skipping...'))
            
        }


    } catch (err) {
        throw err
    }
}



// invoke
StoreAccessTokenToFile(
    process.env.OAUTH_ACCESS_TOKEN,
    process.env.OAUTH_ACCESS_TOKEN_EXPIRE
)


async function sendConfirmMail(req, res, next) {
    try {
        if (!req.result) {
            throw new Error('Cannot process mailer. req.result not found.')
        }

        const tokenFile = await ReadAccessTokenFromFile()
        // re-create token file if not exist
        if (!tokenFile) {
            StoreAccessTokenToFile(
                process.env.OAUTH_ACCESS_TOKEN,
                process.env.OAUTH_ACCESS_TOKEN_EXPIRE
            )
        }

        let transporterGMAIL = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USERNAME,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                accessToken: tokenFile ? tokenFile.accessToken : process.env.OAUTH_ACCESS_TOKEN,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                expires: tokenFile ? parseInt(tokenFile.expires) : parseInt(process.env.OAUTH_ACCESS_TOKEN_EXPIRE)
                // expires: 1646588249252
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        transporterGMAIL.set('oauth2_provision_cb', (user, renew, callback) => {
            console.log(user)
        });

        transporterGMAIL.on('token', token => {
            console.log('A new access token was generated');
            console.log(token);
            console.log('User: %s', token.user);
            console.log('Access Token: %s', token.accessToken);
            console.log('Expires: %s', new Date(token.expires));
            console.log('Expires: %s', new Date(token.expires) - new Date(Date.now()));

            // update environment variables
            process.env.OAUTH_ACCESS_TOKEN = token.accessToken
            process.env.OAUTH_ACCESS_TOKEN_EXPIRE = token.expires
            // save token to file
            StoreAccessTokenToFile(
                process.env.OAUTH_ACCESS_TOKEN,
                process.env.OAUTH_ACCESS_TOKEN_EXPIRE
            )
        });

        const sendMailOptions = {
            from: '"Yo!Photo 👻" <admin@yophoto.com>', // sender address
            to: req.result.email, // list of receivers
            subject: `Hello ${req.result.userName} ✔`, // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Hello ${req.result.userName}, to confirm your email and activate your account, 
                    please click link below:</b><br><br>
                    <a href="${req.protocol}://${req.headers.host}/api/users/activate?token=${req.result.tokenActivation}">Confirm your email</a>`, // html body
        }

        // console.log('Verifying GMAIL transporter..')
        // transporterGMAIL.verify(function (error, success) {
        //     if (error) next(error)
        //     console.log('GMAIL success')
        // })

        await transporterGMAIL.sendMail(sendMailOptions)
        next()


    } catch (err) {
        next(err)
    }


}

module.exports = {
    sendConfirmMail
}