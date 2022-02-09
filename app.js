require('dotenv').config()
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
const app = express()
const expressSwagger = require('express-swagger-generator')(app);
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))



const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Swagger API Tutorial - Poopcode.com",
            version: "1.0.0",
            description:
                "A sample project to understand how easy it is to document and Express API",
        }
    },
    swagger: "2.0",
    //   apis: ["./controller/api/users/index.js"]
    apis: [
        "./controllers/api/users/*.js",
        "./controllers/api/users/login/*.js",
    ] //where the swagger specs for APIs 
    //apis: ["./routes/*.js"] //where the swagger specs for APIs 
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// enrouten di buat untuk membaca folder sebagai route
// route di sini kita definisikan ke folder api
// default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    directory: path.join(__dirname, 'controllers'),
}));



var http = require('http');
var server = http.createServer(app).listen(NODE_PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server started on http://localhost:${NODE_PORT}\n`);
});

// console.log(server)