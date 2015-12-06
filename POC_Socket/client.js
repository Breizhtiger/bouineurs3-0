var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');
    var stream = ss.createStream();

var socket = io.connect('http://localhost:8080');
socket.on('message', function(message) {
        console.log('Le serveur a un message pour vous : ' + message);
        var filename = 'C:\\wwwroot\\nodeupload\\res\\nodejs.png';
        ss(socket).emit('profile-image', stream, {name: filename,location :{longitude : 1.1234}});
        fs.createReadStream(filename).pipe(stream);
        socket.close();
})
