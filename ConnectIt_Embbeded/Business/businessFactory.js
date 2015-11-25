var collectBusiness = {};
var applicationBusiness = {};
var when = require('when');
var toolsFactory = require('./Tools/tools.js');
var dataFactory = require('../DataAccess/DataAccessFactory.js');
var collectGoProBusiness = require('./goProBusinessFactory.js').goproBusiness;
var log = toolsFactory.loggerFactory.collectLogger;
exports.collectBusiness = collectBusiness;
exports.applicationBusiness = applicationBusiness;

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
    log.info("Collect Loop starts")
    StartCollectGoPro()
    .then(function(){ console.log('Get Localisation'); return true; })
    .then(function(){ console.log('Get Temp'); return true; })
    .then(function(){ log.info("End of collect sequences");setTimeout(StartCollectLoop, 10000);});
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
     dataFactory.pictureFactory.insertPicture(Date.now(),picturePath);
   }catch(exception){
     log.alert('Error during picture database inserting',exception)
   }
};
