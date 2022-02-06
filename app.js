const express = require('express')
const { PrismaClient } = require('@prisma/client')
const enrouten = require('express-enrouten')
const path = require('path');
const app = express()

app.use(express.json())

// enrouten di buat untuk membaca folder sebagai route
// route di sini kita definisikan ke folder api
// default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    directory: path.join(__dirname, 'api'),
}));






app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)