var collectBusiness = {};
var provisioningBusiness = {};
var applicationBusiness = {};
var dashboardBusiness = {};

exports.collectBusiness = collectBusiness;
exports.applicationBusiness = applicationBusiness;
exports.provisioningBusiness = provisioningBusiness;
exports.dashboardBusiness = dashboardBusiness;

var when = require('when');
var toolsFactory = require('../Tools/tools.js');
var dataFactory = require('../DataAccess/DataAccessFactory.js');
var collectGoProBusiness = require('./goProBusinessFactory.js').goproBusiness;
var GPS = require('./gpsBusinessFactory.js');
var request = require('request');
var log = toolsFactory.loggerFactory.collectLogger;
var socketTools = toolsFactory.socketFactory;
var fsTools = toolsFactory.fsFactory;


var provisioningDelay = 60000;
var collectDelay = 30000;
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
    if(result != null){
      log.info('Try to send photo at ',+result.datetime);
      //je sauvegarde la photo actuelle
      actualPictureToSend = result;
      getLocationForPicture(actualPictureToSend);
    }else{
        actualPictureToSend = null;
        log.info("Nothing to send ...");
        // Re start the provisioning
        setTimeout(getPictureToSend,provisioningDelay);
    }

  }
};

/*
* When there are issues during data sending
*/
function saveProvisioningKO(){
  log.info("Errors during data sending, disable entries");
  var dateOfData = actualPictureToSend.datetime;
  dataFactory.pictureFactory.updateStatusPictureByDatetime(dateOfData,"Errors");
  dataFactory.locationFactory.updateStatusLocationByDatetime(dateOfData,"Errors");
  // Re start the provisioning
  setTimeout(getPictureToSend,provisioningDelay);
};

/*
* When data sending is OK
*/
function saveProvisioningOK(){
    log.info("Ok, change status of entries");
    var dateOfData = actualPictureToSend.datetime;
    dataFactory.pictureFactory.updateStatusPictureByDatetime(dateOfData,"Send");
    dataFactory.locationFactory.updateStatusLocationByDatetime(dateOfData,"Send");
};

/*
* Callback of getLocationForPicture
* Enables to launch the next action
*/
function manageLocationToSend(err,result){
  if(err){
    saveProvisioningKO();
  }else{
    if(result != null){
      log.info('Location to send');
      console.log('actualPictureToSend',actualPictureToSend);
      if(socketTools.pictureExist(actualPictureToSend.localPath)){
          sendFullData(actualPictureToSend,result);
      }else{
          saveProvisioningKO();
      }
    }else{
      log.info('No Location to send');
      if(socketTools.pictureExist(actualPictureToSend.localPath)){
          sendFullData(actualPictureToSend,null);
      }else{
          saveProvisioningKO();
      }
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
  if(socketTools.lockSocket){
    // Re start the provisioning
    setTimeout(getPictureToSend,provisioningDelay);
  }else{
    try{
      socketTools.sendFullData(pictureInformation,locationInformation,function(){
        saveProvisioningOK();
        deletePictureOfFS(pictureInformation);
      });
      // Re start the provisioning
      setTimeout(getPictureToSend,provisioningDelay);
    }catch(exception){
      log.info("Exception during data sending",exception);
      // Re start the provisioning
      setTimeout(getPictureToSend,provisioningDelay);
    }
  }


};

/**
* Delete the picture of the filesystem
* ONLY if this is not the last pictures and if she is not "created"
*/
function deletePictureOfFS(pictureInformation){
   dataFactory.pictureFactory.getLastPicture(function(err,result){
     if(err){
       console.log("Une erreur ",err)


     }else{
        if(result != null && result._id == pictureInformation._id){
            //on ne supprime pas la photos car c'est la dernière
            console.log("c'est la dernière photo, on la supprime pas . La derniere est "+result._id);
        }else{
          console.log("c'est pas la dernière photo, on peut la supprimer La derniere est "+result._id);
          //pas la dernière, on peut la supprimer
          //fsTools.deletePicture(pictureInformation.localPath);
        }
       }

   });

};

dashboardBusiness.goProIsUp = function(){
    return collectGoProBusiness.isUp(goProIp,goProPassword)
    .then(
      function(value){
        return value;
      }
    );
};




dashboardBusiness.takeSimplePicture = function(heartOnYou){
  currentDate = Date.now();
  log.info("One Shot Starts : "+currentDate);
  collectGoProBusiness.GetNbEltOnFolder(goProIp,goProPassword,'/videos/DCIM')
  .then(function(count){
    if(count != null && count == 0){
      StartCollectGoPro(heartOnYou)
      .then(function(){ OneShotCollectGps();return true; });
    }else{
      console.log("GoPro using by an other process. Manuel Collect impossible");
    }
  });
};


/****Region :  Collect Business *******/

/**
* Enables to start the collect of GoPro Pictures
*/
collectBusiness.startCollect = function(){
  collectGoProBusiness.cleanGoPro(goProIp,goProPassword)
  .then(function(value){
    if(value){
      console.log("GoPro is clean. launch the loop");
      StartCollectLoop();
    }else{
      console.log("Errors during delete actions");
    }
  });
};

collectBusiness.getNbPictures = function(){
  collectGoProBusiness.GetNbPictures(goProIp,goProPassword);
};


/*
* Loop to collect data
*/
function StartCollectLoop(){
    currentDate = Date.now();
    log.info("Collect Loop starts");
    var requestToTest = "http://"+goProIp+":8080/videos";
    //test de la connexion vers la gopro
    request(requestToTest, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //Ok gopro in the place
        collectGoProBusiness.GetNbEltOnFolder(goProIp,goProPassword,'/videos/DCIM')
        .then(function(count){
          if(count != null && count == 0){
            StartCollectGoPro(false)
            .then(function(){ StartCollectGps();return true; });
          }else{
            console.log("GoPro using by an other process. Launch actions on 10 s");
            //Ok, launch the timer
           setTimeout(StartCollectLoop, 10000);
          }
        });
      }else{
          log.info("Oups no GoPro. please connect gopro error : "+error);
          setTimeout(StartCollectLoop, 10000);
      }
    });
  };


 function OneShotCollectGps(){
   log.info("Start GPS (OneShot)");
   gps = new GPS();
   var iGps = 0;

   gps.on('location', function(data) {
     objLocation = data;
     //on attend 5 données différentes pour être sûr
     if(iGps >=5){
       return stopCollectGpsForOneShot();
     }
     iGps = iGps +1;
   });
 };


/**
* Start collect of GPS data
*/
function StartCollectGps(){
  log.info("Start GPS");
  try{
    gps = new GPS();
    var iGps = 0;

    gps.on('error',function(){
        console.log("GPS en erreur");
        return stopCollectGps();
    });

    gps.on('location', function(data) {
      objLocation = data;
      //on attend 5 données différentes pour être sûr
      if(iGps >=5){
        return stopCollectGps();
      }
      iGps = iGps +1;
    });
  }catch(Exception){

  }

};


function stopCollectGpsForOneShot(){
  return gps.closeSerialPort(callBackStopGpsOneShot);
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
function callBackStopGpsOneShot(){
  log.info("Stop Gps Collect(OneShot)");
  SaveLocationOnBdd();
  return true;
};

/**
*
*/
function callBackStopGps(){
  log.info("Stop Gps Collect");
  SaveLocationOnBdd();
  setTimeout(StartCollectLoop, collectDelay);
};



function StartCollectGoPro(heartOnYou){
  try{
    log.info("Go Pro Collect Starts");
    if(heartOnYou){
       console.log("....<3 * Heart on You * ");
        return collectGoProBusiness.startNewCollect(goProIp,goProPassword,SaveFavoritePictureOnBddCallBack);
    }else{
        return collectGoProBusiness.startNewCollect(goProIp,goProPassword,SavePictureOnBddCallBack);
    }

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

/**
* Callback to save picture instance on the database
* @param picturePath : local picture path to save
*/
function SaveFavoritePictureOnBddCallBack(picturePath){
   try{

     //var pathArray = picturePath.split('/');
     //var path = pathArray[pathArray.length-1];

     dataFactory.pictureFactory.insertFavoritePicture(currentDate,picturePath);
   }catch(exception){
     log.alert('Error during favorite picture database inserting',exception)
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
