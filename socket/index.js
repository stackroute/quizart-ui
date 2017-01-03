const async = require('async');

const authorize = require('./services/authorize');

const client = require('../getRedisClient');

module.exports = function(io) {
  console.log('Initializing Socket Server');
  io.on('connection', (socket) => {
    console.log('SOCKET: A client connected');
    socket.subscriptions = [];
    socket.listeners = [];

    socket.on('authorize', (token) => {
      console.log('Authorizing');
      authorize(token, (err, claims) => {
        if(err) { /* Authorization Failed */console.error('Authorization Failed:', err); return; }
        socket.player = claims.sub;
        console.log('authorized:', socket.player);

        bootstrapProvisioner(socket);
        bootstrapGameplay(socket);

        socket.emit('authorized');
      });
    });

    socket.on('disconnect', () => {
      console.log('SOCKET: A client disconnected');
      socket.listeners.forEach((listener) => {
        client.removeListener('message', listener);
      });
      socket.subscriptions.forEach((subscription) => {
        client.unsubscribe(subscription);
      });
    });
  });
};

function sendQueueRequestToProvisioner(player, callback) {
  console.log('player:', player);
  client.lpush('provisionerInputQueue', player, callback);
}

function handleError(socket, err) {
  console.error('ERR:', err);
  throw new Error();
}
