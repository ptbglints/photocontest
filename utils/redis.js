const redis = require("redis");

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        reconnectStrategy: retries => Math.min(retries * 50, 500)
    }
});

(async () => {
    client.on("connect", function () {
        console.log("Redis connecting.");
    });
    client.on("ready", function () {
        console.log("Redis ready.");
    });
    client.on("end", function () {
        client.log("Redis end.");
    });
    client.on("error", function () {
        console.log("Redis error.");
    });
    // client.on("reconnecting", function () {
    //     console.log("Redis reconnecting.");
    // });

    await client.connect();

    const obj = {
        user: 'me',
        enemy: 'dia'
    }
    await client.json.set(1, '$', obj);
    const time = await client.json.get(1);
    console.log(time)
})();

module.exports = client