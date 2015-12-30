/*var io  = require('socket.io').listen(5001),
    dl  = require('delivery'),
    fs  = require('fs');

io.sockets.on('connection', function(socket){
  var delivery = dl.listen(socket);
  delivery.on('receive.success',function(file){

    fs.writeFile(file.name,file.buffer, function(err){
      if(err){
        console.log('File could not be saved.');
      }else{
        console.log('File saved.');
      };
    });
  });
});
*/
var io = require('socket.io').listen(5555);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

io.of('/user').on('connection', function(socket) {
  console.log('socket');
  ss(socket).on('profile-image', function(stream, data) {
    console.log(data.name);
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });


});
