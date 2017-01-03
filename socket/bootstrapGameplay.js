const client = require('../getRedisClient');

module.exports = function(socket) {
  socket.on('initializeGame', (gameId) => {
    // Remember GameId
    socket.gameId = gameId;

    function listener(channel, message) {
      if(channel === socket.gameId) {
        socket.emit(message.cmd, message.args);

        if(message.cmd === 'gameCompleted') {
          // Unsubscribe
          socket.unsubscribe(gameId+'_broadcast');

          // Remove Listener
          socket.removeListener('message', listener);
        }
      }
    }

    client.addListener('message', listener);
    socket.listeners.push(listener);

    // Subscribe to Broadcast Channel
    client.subscribe(gameId+'_broadcast');
    socket.subscriptions.push(gameId+'_broadcast');

    // Send state to client
    client.publish('gameMgrWorkQueue', {cmd: 'sendState'});
  });
};
