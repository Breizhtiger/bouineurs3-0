var http = require('http');
var fs = require('fs');
var ss = require('socket.io-stream');
var path = require('path');

var server = http.createServer();

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message', 'Vous êtes bien connecté !');
    ss(socket).on('profile-image', function(stream, data) {
    console.log("image ->",data);
    var filename = 'output/'+Date.now()+'_'+ path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });

  socket.on('disconnect', function (socket) {
      console.log('Un client est déconnecté !');
  });
});




server.listen(8080);
