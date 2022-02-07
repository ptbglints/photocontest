require('dotenv').config()
const NODE_PORT = process.env.PORT || process.env.NODE_PORT || 8000
const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path');
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }))

// enrouten di buat untuk membaca folder sebagai route
// route di sini kita definisikan ke folder api
// default javascript akan membaca folder index.js sebagai route module
app.use(enrouten({
    // directory: path.join(__dirname, 'api'),
    directory: 'api',
}));





app.listen(NODE_PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server started on http://localhost:${NODE_PORT}\n`);
});