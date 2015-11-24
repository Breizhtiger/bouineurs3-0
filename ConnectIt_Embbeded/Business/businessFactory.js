var collectBusiness = {};
var when = require('when');
var dataFactory = require('../DataAccess/DataAccessFactory.js');
var collectGoProBusiness = require('./goProBusinessFactory.js').goproBusiness;
exports.collectBusiness = collectBusiness;

collectBusiness.insertTest = function(stringName){
  dataFactory.testBdd.insertTest(stringName);
};

collectBusiness.getAllTest = function(){
  dataFactory.testBdd.getAllFromTest();
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
    StartCollectGoPro()
    .then(function(){ console.log('Get Localisation'); return true; })
    .then(function(){ console.log('Get Temp'); return true; })
    .then(function(){ setTimeout(StartCollectLoop, 10000);});
};

function StartCollectGoPro(){
  try{
    return collectGoProBusiness.startNewCollect('10.5.5.9', 'Bouineur3.0',SavePictureOnBddCallBack);
  }catch(exception){
    console.alert('GoPro Errors',exception);
    return true;
  }
};

/**
* Callback to save picture instance on the database
* @param picturePath : local picture path to save
*/
function SavePictureOnBddCallBack(picturePath){
    dataFactory.pictureFactory.insertPicture(Date.now(),picturePath);
};
