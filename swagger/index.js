const express = require('express')
const router = express.Router()
const appRoot = require('app-root-path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDocYAML = YAML.load(`${appRoot}/swagger/swagger.yml`);
const json = require('../swagger/json')
// console.log(json.myJson)
// const swaggerDocJSON = swaggerJsdoc(json.myJson);

const swaggerDocument = json.mySwaggerJson
// console.log('swaggerDocument', swaggerDocument)

// swagger custom JS
var optionsSwagger = {
    // customJs: '/public/custom.js',
    customCss: `
    .swagger-ui .topbar { border-bottom: 20px solid #5dc6d1; }
    `,
    customSiteTitle: "Yo!Photo 👻",
    explorer: false,
    swaggerOptions: {
        url: "/api-docs/swagger.json",
        tryItOutEnabled: true,
        requestSnippetsEnabled: true,
        syntaxHighlight: {
            theme: 'arta' // "agate"*, "arta", "monokai", "nord", "obsidian", "tomorrow-night"
        }
    }
};

// const mySwagger = router.use('/', function (req, res, next) {
//     // dynamic swagger url/host
//     swaggerDocument.servers[0].url = `${req.protocol}://${req.headers.host}/api`
//     swaggerDocument.servers[1].url = `${req.protocol}://${req.headers.host}/api/v1`
//     swaggerDocument.servers[2].url = `${req.protocol}://${req.headers.host}/api/v2`
//     req.swaggerDocument = swaggerDocument;
//     next();
// }, swaggerUi.serve, swaggerUi.setup(swaggerDocument, optionsSwagger))

const mySwaggerGet = router.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// const mySwagger = router.use('/api-docs', swaggerUi.serveFiles(null, optionsSwagger), swaggerUi.setup(null, optionsSwagger));

const mySwagger = router.use('/api-docs', function (req, res, next) {
    // dynamic swagger url/host
    swaggerDocument.servers[0].url = `${req.protocol}://${req.headers.host}/api`
    swaggerDocument.servers[1].url = `${req.protocol}://${req.headers.host}/api/v1`
    swaggerDocument.servers[2].url = `${req.protocol}://${req.headers.host}/api/v2`
    req.swaggerDocument = swaggerDocument;
    next();
}, swaggerUi.serveFiles(null, optionsSwagger), swaggerUi.setup(null, optionsSwagger))

module.exports = {
    mySwagger,
    mySwaggerGet
}