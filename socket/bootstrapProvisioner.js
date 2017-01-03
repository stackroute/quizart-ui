const client = require('../getRedisClient');
const async = require('async');

module.exports = function(socket) {
  socket.on('queue', () => {
    if(socket.isQueued) { return; }
    async.series([
      subscribeToReceiveGameId.bind(null, socket.player, socket),
      sendQueueRequestToProvisioner.bind(null, socket.player)
    ], (err) => {
      if(err) { handleError(socket, err); return; }
    });
  });

  function subscribeToReceiveGameId(player, socket, callback) {
    callback(null);
    function listener(channel, gameId) {
      if(channel === player+'_gameId') {
        client.removeListener('message', listener);
        socket.listeners.delete(listener);
        client.unsubscribe(player+'_gameId');
        socket.subscriptions.delete(player+'_gameId');
        socket.isQueued = false;
        socket.emit('startGame', gameId);
      }
    }
    client.addListener('message', listener);
    socket.listeners.add(listener);
    socket.isQueued = true;
    client.subscribe(player+'_gameId');
    socket.subscriptions.add(player+'_gameId');
  }
};

function sendQueueRequestToProvisioner(player, callback) {
  console.log('player:', player);
  client.lpush('provisionerInputQueue', player, callback);
}

function handleError(socket, err) {
  console.error('ERR:', err);
  throw new Error();
}