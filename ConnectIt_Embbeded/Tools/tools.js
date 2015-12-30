
/*libraries inclusion*/
var winston = require('winston');
var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');
/*Initialisation of the module*/
var loggerFactory = {};
var socketFactory = {};
var fsFactory = {};
exports.loggerFactory = loggerFactory;
exports.socketFactory = socketFactory;
exports.fsFactory = fsFactory;
//var serverUrl = 'http://localhost:80';
var serverUrl = 'http://52.59.249.149:80';
var socket = io.connect(serverUrl);

socket.on('message', function(message) {
    console.log('Le serveur a un message pour vous : ' + message);
});

/*LoggerFactory*/
loggerFactory.collectLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'collect_logs.log' })
    ]
  });
/*LoggerFactory*/
loggerFactory.provisioningLogger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'provisioning_logs.log' })
      ]
});

/*LoggerFactory*/
loggerFactory.dashboardLogger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'dashboard_logs.log' })
      ]
});

fsFactory.deletePicture = function(picturePath){
    console.log("Try to delete this file : "+picturePath);
    fs.unlink(picturePath, function(err){
      if(err){
        console.log("errors on deleting",err);
      }else{
          console.log("File successfully delete");
      }

    });
};


socketFactory.pictureExist = function fileExists(filePath){
  try{
    return fs.statSync(filePath);
  }catch(err){
    return false;
  }
};


socketFactory.testConnection = function(){
  // Re start the provisioning


  /*return socket.on('pong', function(message) {
      return true;
  });

  socket.emit('ping')*/

}

socketFactory.sendFullData = function(pictureInformation, locationInformation,callBackFailed){
  var stream = ss.createStream();


  function callbackCloseSocket(){
  console.log('callbackCloseSocket');
    //socket.close();
  };

  var filename = pictureInformation.localPath;
  console.log("send ->"+filename);
  //var filename = '/home/anthony/test.png';
  try{
    ss(socket).emit('fullData', stream, {mode: 'FullData',location :locationInformation});
    var rsStream = fs.createReadStream(filename);
    rsStream.on('error',function(err){
      console.log("error on fulldata sending",err);
      callbackCloseSocket();
    });
    rsStream.on('end', callbackCloseSocket);
    rsStream.pipe(stream);
  }catch(exception){
  console.log("Error : ",exception);
    throw exception;
  }
};
