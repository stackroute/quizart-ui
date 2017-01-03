const async = require('async');

const authorize = require('./services/authorize');

const client = require('../getRedisClient');
    
module.exports = function(io) {
  console.log('Initializing Socket Server');
  io.on('connection', (socket) => {
    let listeners = new Set();
    let subscriptions = new Set();
    let player;
    let isQueued = false;
    console.log('SOCKET: A client connected');

    socket.on('authorize', (token) => {
      console.log('Authorizing');
      authorize(token, (err, claims) => {
        if(err) { /* Authorization Failed */console.error('Authorization Failed:', err); return; }
        player = claims.sub;
        console.log('authorized:', player);
        socket.emit('authorized');
      });
    });

    // TODO: Handle queue, and emit startGame
    socket.on('queue', () => {
      if(isQueued) { return; }
      async.series([
        subscribeToReceiveGameId.bind(null, player, socket),
        sendQueueRequestToProvisioner.bind(null, player)
      ], (err) => {
        if(err) { handleError(err); return; }
      });
    });

    socket.on('disconnect', () => {
      console.log('SOCKET: A client disconnected');
      listeners.forEach((listener) => {
        client.removeListener('message', listener);
      });
      subscriptions.forEach((subscription) => {
        client.unsubscribe(subscription);
      });
    });

    function subscribeToReceiveGameId(player, socket, callback) {
      callback(null);
      function listener(channel, gameId) {
        if(channel === player+'_gameId') {
          client.removeListener('message', listener);
          listeners.delete(listener);
          client.unsubscribe(player+'_gameId');
          subscriptions.delete(player+'_gameId');
          isQueued = false;
          socket.emit('startGame', gameId);
        }
      }
      client.addListener('message', listener);
      listeners.add(listener);
      isQueued = true;
      client.subscribe(player+'_gameId');
      subscriptions.add(player+'_gameId');
    }
  });
};

function sendQueueRequestToProvisioner(player, callback) {
  console.log('player:', player);
    const client1 = client.duplicate();
    // const redis = require('redis');
    // const redisHost = process.env.REDIS_HOST || 'localhost';
    // const redisPort = process.env.REDIS_PORT || 6379;
    // const redisClient = redis.createClient(redisPort, redisHost);
    client1.lpush('provisionerInputQueue', player, callback);
}

function handleError(err) {
  console.error('ERR:', err);
  throw new Error();
}