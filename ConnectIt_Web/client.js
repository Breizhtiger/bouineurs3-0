var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');

var socket = io.connect('127.0.0.1:5555/user');
var stream = ss.createStream();
var filename = '/home/anthony/test.png';

ss(socket).emit('profile-image', stream, {name: filename});
fs.createReadStream(filename).pipe(stream);
// send data
