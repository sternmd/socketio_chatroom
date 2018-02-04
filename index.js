var express = require('express');
var app = express();

// Server
var server = app.listen(3000, () => {
  console.log('listening to request on port 3000');
})

// Static files
app.use(express.static('public'));
