
/*libraries inclusion*/
var winston = require('winston');
var io = require('socket.io-client');
var ss = require('socket.io-stream');
var fs = require('fs');
var when = require('when');
/*Initialisation of the module*/
var loggerFactory = {};
var socketFactory = {};
var fsFactory = {};
exports.loggerFactory = loggerFactory;
exports.socketFactory = socketFactory;
exports.fsFactory = fsFactory;
//var serverUrl = 'http://127.0.0.1:3000';
var serverUrl = 'http://54.93.53.233:3000';
var socket = io.connect(serverUrl);

var lockSocket = false;

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
    try{
      if(fs.statSync(picturePath)){
        fs.unlink(picturePath, function(err){
          if(err){
            console.log("errors on deleting",err);
          }else{
              console.log("File successfully delete");
          }
        });
      }else{
        console.log("File doesn not exist : ",picturePath);
      }
    }catch(exception){
      console.log("exception on deleting",exception);
    }
};


socketFactory.pictureExist = function fileExists(filePath){
  try{
    return fs.statSync(filePath);
  }catch(err){
    console.log('Error to find pictures',filePath);
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

socketFactory.sendFullData = function(pictureInformation, locationInformation,callback){
  var stream = ss.createStream();


  function callbackCloseSocket(){
      console.log('callbackCloseSocket');
    //socket.close();
    lockSocket = false;
    return true;
  };

  var filename = pictureInformation.localPath;
  console.log("send ->"+filename);
  lockSocket = true;
  try{
    var pathArray = filename.split('/');
    var newName = pathArray[pathArray.length-1];
    ss(socket).emit('fullData', stream,
      {
        name:newName,
        dateOfPicture:pictureInformation.datetime.toString(),
        typeOfPicture:pictureInformation.type,
        mode: 'FullData',
        location :locationInformation
      }
    );
    var rsStream = fs.createReadStream(filename);
    rsStream.on('error',function(err){
      console.log("error on fulldata sending",err);
      callbackCloseSocket();
    });
    rsStream.on('end', function(){
      callbackCloseSocket();
      callback();
    });
    rsStream.pipe(stream);
  }catch(exception){
  console.log("Error : ",exception);
    throw exception;
  }
};
