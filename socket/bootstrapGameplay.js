const client = require('../getRedisClient');

module.exports = function(socket) {
  console.log('Registering initializeGame');
  socket.on('initializeGame', (gameId) => {
    console.log('Initializing game', gameId, 'for player', socket.player);
    // Remember GameId0
    socket.gameId = gameId;

    function listener(channel, message) {
      if(channel === socket.gameId+'_broadcast') {
        socket.emit("stateChanged", message);

        if(message.cmd === 'gameCompleted') {
          // Unsubscribe
          client.unsubscribe(gameId+'_broadcast');

          // Remove Listener
          client.removeListener('message', listener);
        }
      }
    }

    client.addListener('message', listener);
    socket.listeners.add(listener);

    // Subscribe to Broadcast Channel
    client.subscribe(gameId+'_broadcast');
    socket.subscriptions.add(gameId+'_broadcast');

    // Send state to client
    console.log('socket.gameId:', socket.gameId);
    forwardEventToGameController(socket.gameId, socket.player, 'sendState');

    ['sendState', 'pickQuestion', 'hitBuzzer', 'answer'].forEach((cmd) => {
      socket.on(cmd, forwardEventToGameController.bind(null, socket.gameId, socket.player, cmd));
    });
  });
};

function forwardEventToGameController(gameId, player, cmd, args) {
  const client1 = client.duplicate();
  console.log('-gameId:', gameId);
  console.log('-player:', gameId);
  console.log('-cmd:', gameId);
  console.log('-args:', gameId);
  client1.lpush('gameMgrWorkQueue', JSON.stringify({ gameId: gameId, cmd: cmd, args: args, player: player }), (err) => {
    if(err) { return handleError(null, err); }
  });
}

function handleError(socket, err) {
  console.error('ERR:', err);
}
