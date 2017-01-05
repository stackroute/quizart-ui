const async = require('async');

const authorize = require('./services/authorize');
const bootstrapProvisioner = require('./bootstrapProvisioner');
const bootstrapGameplay = require('./bootstrapGameplay');
const client = require('../getRedisClient');

module.exports = function(io) {
  console.log('Initializing Socket Server');
  io.on('connection', (socket) => {
    console.log('going to client');
    var clues = require('./clues.js')(socket);
    console.log('SOCKET: A client connected');
    socket.subscriptions = new Set();
    socket.listeners = new Set();
    socket.isQueued= false;
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
