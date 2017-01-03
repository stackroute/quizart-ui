const redis = require('redis');

const redisHost = '172.23.238.251';
const redisPort = 6379;

const client = redis.createClient(redisPort, redisHost);

function listener(channel, message) {
  console.log(channel, message);
  client.removeListener('message', listener);
  client.unsubscribe('broadcast');
  client.lpush('provisionerInput', 'abc', (err) => { if(err) {console.error('ERR:',err);} console.log('pushed'); });
}

client.subscribe('broadcast');

client.addListener('message', listener);