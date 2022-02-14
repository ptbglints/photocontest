require('dotenv').config()
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
const { ROLE } = require('./model')
const { verifyJWT } = require('./middleware/authJwt')
const { authRole } = require('./middleware/authRole')
// const cache = require('./middleware/cache')
const { responseSuccess } = require('./middleware/responseSuccess')
const { logErrors, clientErrorHandler, errorHandler } = require('./middleware/errorHandler')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.urlencoded({
        extended: true
    }))
    // NEW: kita buka folder public di route public
app.use('/public', express.static('public'))
const morganBody = require('morgan-body')
morganBody(app);


const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');
const swaggerUi = require('swagger-ui-express')

// morgan logger
const morganBody = require('morgan-body')
morganBody(app, { logResponseBody: false });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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