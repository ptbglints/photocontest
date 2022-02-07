require('dotenv').config()
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
const app = express()
const expressSwagger = require('express-swagger-generator')(app);

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `localhost:${NODE_PORT}`,
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./controllers/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
    // enrouten di buat untuk membaca folder sebagai route
    // route di sini kita definisikan ke folder api
    // default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    directory: path.join(__dirname, 'controllers'),
}));





app.listen(NODE_PORT, '0.0.0.0', () => {
    console.log(`\n🚀 emoji Server started on http://localhost:${NODE_PORT}\n`);
});