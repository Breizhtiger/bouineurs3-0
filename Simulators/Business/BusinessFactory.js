var gpsBusiness = {};
var fs = require('fs');

var gpsDriverPath  = '/home/anthony/wwwroot/MoqDriver/GPS';
var tempDriverPath  = '/home/anthony/wwwroot/MoqDriver/TEMP';

var gpsDelay = 5000;

//export GPS Business
exports.gpsBusiness = gpsBusiness;
//Init the gps simulator
gpsBusiness.initGpsSimulator = function(){

  try{
    fs.unlinkSync(gpsDriverPath);
  }catch(err){
    console.log('delete the simulator GPS File issues',err);
  }
};
//Start the gps Simulator
gpsBusiness.startGpsSimulator = function(stringName){
    gpsSimulatorTimer();
};

//Timer of GPS Simulator
function gpsSimulatorTimer(){
  var location = 'lat:3456543356;long:12.23456;date:'+ new Date();
   writeOnGpsDriveFile(location);
   setTimeout(gpsSimulatorTimer, gpsDelay);
};

//Write data fot the GPS Simulator
function writeOnGpsDriveFile(data){
  fs.appendFile(gpsDriverPath, data + '\n', function (err) {
    if (err) return console.log(err);
  });
};
