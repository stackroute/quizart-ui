const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

console.log('REDIS Connecting to:', redisHost, redisPort);

const redisClient = redis.createClient(redisPort, redisHost);

module.exports = redisClient;