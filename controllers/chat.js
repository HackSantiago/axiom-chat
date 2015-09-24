
exports.index = function(req, res) {
  res.render('chat');
};

exports.handleSocketConnection = function(io) {

  io.sockets.on('connection', function (socket) {

    socket.emit('message', { text: 'Welcome to the Volatile AxiomChat!', user_name: 'VolatileBot' });

    socket.on('send', function (data) {
      io.sockets.emit('message', data);
    });

  });

}
