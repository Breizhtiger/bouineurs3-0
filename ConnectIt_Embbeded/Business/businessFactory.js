var collectBusiness = {};
var provisioningBusiness = {};
var applicationBusiness = {};
exports.collectBusiness = collectBusiness;
exports.applicationBusiness = applicationBusiness;
exports.provisioningBusiness = provisioningBusiness;

var when = require('when');
var toolsFactory = require('../Tools/tools.js');
var dataFactory = require('../DataAccess/DataAccessFactory.js');
var collectGoProBusiness = require('./goProBusinessFactory.js').goproBusiness;
var GPS = require('./gpsBusinessFactory.js');
var log = toolsFactory.loggerFactory.collectLogger;
var socketTools = toolsFactory.socketFactory;

var provisioningDelay = 7000;
var collectDelay = 5000;
var goProIp = '10.5.5.9';
var goProPassword = 'Bouineur3.0';

var currentDate = Date.now();
var actualPictureToSend = {};
//gps object
var gps = {};
var objLocation = {};
/**
* Enables to test database connectivityl
*/
applicationBusiness.databaseIsAlive = function(){
};


/*
* Start the provisioning loop
*/
provisioningBusiness.startProvisioning = function(){
  log.info("Provisioning Started")
  startProvisioningLoop();
};

function startProvisioningLoop(){
    log.info("Loop for the Provisioning Started")
    getPictureToSend();
};

/*
* CallBack of getPictureToSend
* Enables to launch the next action
*/
function managePictureToSend(err,result){
  if(err){
    log.alert('Manage Picture To Send Errors',err);
    //return handleError(err); je laisse en commentaite pour un test
  }else{
    log.info('Try to send photo at ',+result[0].datetime);
    //je sauvegarde la photo actuelle
    actualPictureToSend = result[0];
    getLocationForPicture(result[0]);
  }
};

/*
* When there are issues during data sending
*/
function saveProvisioningKO(){
  log.info("Errors during data sending, disable entries");
};

/*
* When data sending is OK
*/
function saveProvisioningOK(){
    log.info("Ok, change status of entries");
};

/*
* Callback of getLocationForPicture
* Enables to launch the next action
*/
function manageLocationToSend(err,result){
  if(err){
    saveProvisioningKO();
  }else{
    log.info('Location to send :',result[0]);
    if(socketTools.pictureExist(actualPictureToSend.localPath)){
        sendFullData(actualPictureToSend,result[0]);
    }else{
        saveProvisioningKO();
    }
  }
};

/*
* First action of the provisioning
*/
function getPictureToSend(){
   log.info("First action of the provisioning");
   dataFactory.pictureFactory.getPictureToSend(managePictureToSend);
};

/*
* Get the location link with the picture
*/
function getLocationForPicture(picture){
  var filter = {datetime: picture.datetime};
  dataFactory.locationFactory.getOneLocationByFilter(filter,manageLocationToSend);
};

/*
* Send full data
*/
function sendFullData(pictureInformation, locationInformation){
  log.info("Try to send datas");
  try{
    socketTools.sendFullData(pictureInformation,locationInformation);
    saveProvisioningOK();
  }catch(exception){
    log.alert("Exception during data sending",exception)
  }
  // Re start the provisioning
  setTimeout(getPictureToSend,provisioningDelay);
};




/****Region :  Collect Business *******/

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
  setTimeout(StartCollectLoop, collectDelay);
};



function StartCollectGoPro(){
  try{
    log.info("Go Pro Collect Starts");
    return collectGoProBusiness.startNewCollect(goProIp,goProPassword,SavePictureOnBddCallBack);
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

    if(objLocation.lat_ref == 'S'){
      objLocation.latitude = -1 * objLocation.latitude;
    }

    if(objLocation.long_ref == 'W'){
      objLocation.longitude = -1 *  objLocation.longitude;
    }

    dataFactory.locationFactory.insertData(currentDate,objLocation);
  }catch(exception){
    log.alert('Error during location database inserting',exception)
  }

};
/****End - Region :  Collect Business *******/
