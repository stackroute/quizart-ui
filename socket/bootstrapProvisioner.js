const client = require('../getRedisClient');

module.exports = function() {
  socket.on('queue', () => {
    if(isQueued) { return; }
    async.series([
      subscribeToReceiveGameId.bind(null, socket.player, socket),
      sendQueueRequestToProvisioner.bind(null, socket.player)
    ], (err) => {
      if(err) { handleError(err); return; }
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
        isQueued = false;
        socket.emit('startGame', gameId);
      }
    }
    client.addListener('message', listener);
    socket.listeners.add(listener);
    isQueued = true;
    client.subscribe(player+'_gameId');
    socket.subscriptions.add(player+'_gameId');
  }
};
