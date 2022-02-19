require('dotenv').config()
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
// const cache = require('./middleware/cache')
const { responseSuccess } = require('./middleware/responseSuccess')
const { logErrors, clientErrorHandler, errorHandler } = require('./middleware/errorHandler')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// allow CORS
app.use(cors());

// app.enable('trust proxy') to know if a reqest is http or https
// source: https://stackoverflow.com/a/16405622
app.enable('trust proxy')

// NEW: kita buka folder public di route public
app.use('/public', express.static('public'))



const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');
const swaggerUi = require('swagger-ui-express')

// morgan logger
const morganBody = require('morgan-body')
morganBody(app, { logResponseBody: false });

// swagger middleware
app.use('/api-docs', function(req, res, next){
    // dynamic swagger url/host
    swaggerDocument.servers[0].url = `${req.protocol}://${req.headers.host}/api`
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup());


// enrouten di buat untuk membaca folder sebagai route
// route di sini kita definisikan ke folder api
// default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    directory: path.join(__dirname, 'controllers'),
}));

// success response middleware
app.use(responseSuccess)

// catch errors
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)


var server = app.listen(NODE_PORT, () => {
    console.log(`ENV = ${process.env.NODE_ENV}`)
    console.log(`🚀 Server started on http://localhost:${NODE_PORT}\n`);
});