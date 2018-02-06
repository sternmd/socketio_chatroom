const express = require('express');
const socket = require('socket.io');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

// Server
let server = app.listen(3000, () => {
  console.log('listening to request on port 3000');
})

// Sass middleware
app.use(
  sassMiddleware({
    src: __dirname + '/scss',
    dest: __dirname + '/public/css',
    debug: true,
  })
);

// The static middleware must come after the sass middleware
app.use(express.static(path.join(__dirname, 'public')));

// Socket connection / setup
let io = socket(server);

io.on('connection', socket => {
  let clientCount = io.engine.clientsCount;
  console.log('made socket connection:', socket.id);

  // Listen for chat Message
  socket.on('chat', data => {
    io.sockets.emit('chat', data);
    console.log(data);
  });

  // Listen for typing
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  // User count
  io.sockets.emit("user count", clientCount);
  socket.on("disconnect", () => {
    io.sockets.emit("user count", clientCount);
  });

});
