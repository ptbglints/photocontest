const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
const app = express()
const expressSwagger = require('express-swagger-generator')(app);

app.use(express.json())

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
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






app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)