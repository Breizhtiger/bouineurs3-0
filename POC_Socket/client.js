var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');

var stream = ss.createStream();
var socket = io.connect('http://localhost:3015');
socket.on('message', function(message) {
        console.log('Le serveur a un message pour vous : ' + message);
        var filename = '/home/anthony/test.png';
        ss(socket).emit('profile-image', stream, {name: filename,location :{longitude : 1.1234}});
        var rsStream = fs.createReadStream(filename);
        rsStream.on('end', callbackCloseSocket)
          rsStream.pipe(stream);
});
function callbackCloseSocket(){
  socket.close();
};
