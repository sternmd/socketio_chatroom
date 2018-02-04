var express = require('express');
var socket = require('socket.io');
var app = express();

// Server
var server = app.listen(3000, () => {
  console.log('listening to request on port 3000');
})

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  // Listen for chat Message
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
    console.log(data);
  })

  // Listen for typing
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  })
})
