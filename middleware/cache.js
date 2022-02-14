const cache = require('express-redis-cache')({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD,
    expire: Number(process.env.REDIS_DEFAULT_EXPIRE)
});

cache.on('connected', function () {
    console.log('Connected to Redis')
});

module.exports = cache;