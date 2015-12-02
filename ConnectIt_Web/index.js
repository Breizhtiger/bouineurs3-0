var io = require('socket.io');
  var socket = io.connect('http://127.0.0.1:5001');

  socket.on('connect', function(){
    var delivery = new Delivery(socket);

    delivery.on('receive.start',function(fileUID){
      console.log('receiving a file!');
    });

    delivery.on('receive.success',function(file){
      if (file.isImage()) {
        console.log("file ",file);
        console.log("url", file.dataURL());
      };
    });
  });
