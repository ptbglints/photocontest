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
app.use(express.urlencoded({
    extended: true
}))

const morganBody = require('morgan-body')
morganBody(app, {logResponseBody: false});

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');
const swaggerUi = require('swagger-ui-express')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// enrouten di buat untuk membaca folder sebagai route
// route di sini kita definisikan ke folder api
// default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    directory: path.join(__dirname, 'controllers'),
}));

/* ***************
 * API V2
 * ***************/

const userApi = require('./controllers/apiv2/users')
const profilesApi = require('./controllers/apiv2/profiles')
app.use('/api/v2/users', userApi)
app.use('/api/v2/users/profiles', profilesApi)

// success response middlewares
app.use(responseSuccess)

// catch error middlewares
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)


var http = require('http');
var server = http.createServer(app).listen(NODE_PORT, '0.0.0.0', () => {
    console.log(`ENV = ${process.env.NODE_ENV}`)
    console.log(`🚀 Server started on http://localhost:${NODE_PORT}\n`);
});