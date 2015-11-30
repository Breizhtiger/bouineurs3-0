var collectBusiness = {};
var applicationBusiness = {};
exports.collectBusiness = collectBusiness;
exports.applicationBusiness = applicationBusiness;

var when = require('when');
var toolsFactory = require('../Tools/tools.js');
var dataFactory = require('../DataAccess/DataAccessFactory.js');
var collectGoProBusiness = require('./goProBusinessFactory.js').goproBusiness;
var GPS = require('./gpsBusinessFactory.js');
var log = toolsFactory.loggerFactory.collectLogger;

var currentDate = Date.now();
//gps object
var gps = {};

var objLocation = {};
/**
* Enables to test database connectivityl
*/
applicationBusiness.databaseIsAlive = function(){

};

/**
* Enables to start the collect of GoPro Pictures
*/
collectBusiness.startCollect = function(){
  StartCollectLoop();
};

/*
* Loop to collect data
*/
function StartCollectLoop(){
    currentDate = Date.now();
    log.info("Collect Loop starts")
    StartCollectGoPro()
    .then(function(){ StartCollectGps();return true; });
};

/**
* Start collect of GPS data
*/
function StartCollectGps(){
  log.info("Start GPS");
  gps = new GPS();
  var iGps = 0;

  gps.on('location', function(data) {
    objLocation = data;
    //on attend 5 données différentes pour être sûr
    if(iGps >=5){
      return stopCollectGps();
    }
    iGps = iGps +1;
  });
};

/**
* Stop the collect (save energy .... COP21 power)
*/
function stopCollectGps(){
  return gps.closeSerialPort(callBackStopGps);
};

/**
*
*/
function callBackStopGps(){
  log.info("Stop Gps Collect");
  SaveLocationOnBdd();
  setTimeout(StartCollectLoop, 10000);
};



function StartCollectGoPro(){
  try{
    log.info("Go Pro Collect Starts")
    return collectGoProBusiness.startNewCollect('10.5.5.9', 'Bouineur3.0',SavePictureOnBddCallBack);
  }catch(exception){
    log.alert('GoPro Collect Errors',exception);
    return true;
  }
};



/**
* Callback to save picture instance on the database
* @param picturePath : local picture path to save
*/
function SavePictureOnBddCallBack(picturePath){
   try{
     dataFactory.pictureFactory.insertPicture(currentDate,picturePath);
   }catch(exception){
     log.alert('Error during picture database inserting',exception)
   }
};

function SaveLocationOnBdd(){
  try{
      dataFactory.locationFactory.insertData(currentDate,objLocation);
  }catch(exception){
    log.alert('Error during location database inserting',exception)
  }

};
