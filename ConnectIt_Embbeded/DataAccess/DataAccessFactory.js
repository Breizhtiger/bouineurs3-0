var mongoose = require('mongoose');
var toolsFactory = require('../Tools/tools.js');
var log = toolsFactory.loggerFactory.collectLogger;
var testBdd = {};
var pictureFactory = {};
var locationFactory = {};
exports.testBdd = testBdd;
exports.pictureFactory = pictureFactory;
exports.locationFactory = locationFactory;

mongoose.connect('mongodb://127.0.0.1/connectIt');

//connection to database
var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
      log.info("Database connection : OK")
    });


//creation of schemas
var schema = new mongoose.Schema({
  name:    String
});

var locationSchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now() },
  longitude: Number,
  latitude: Number,
  altitude : Number,
  speed : Number,
  status: String
});

var pictureShotSchema = new mongoose.Schema({
  datetime: Date,
  localPath: String,
  status: String,
  type : String
});

//create a new model with the scema
var users = mongoose.model('users',schema);
var locations = mongoose.model('locations',locationSchema);
var pictures = mongoose.model('pictures',pictureShotSchema);



pictureFactory.insertPicture = function(date,path){
 var create = new pictures({datetime: date,localPath: path ,status: 'created', type: 'normal'});
   create.save(function (err) {
    if (err) { throw err; }
    log.info('Pictures '+path+' inserted on database');
  });
};

pictureFactory.insertFavoritePicture = function(date,path){
 var create = new pictures({datetime: date,localPath: path ,status: 'created', type: 'heart'});
   create.save(function (err) {
    if (err) { throw err; }
    log.info('Favorite Picture '+path+' inserted on database');
  });
};



pictureFactory.getPictureToSend = function(callback){
  pictures.count({status: 'created'},function(err,count){
        log.info("There are  potential pictures to send :",count);
  });

  pictures.findOne({status: 'created'}).sort('datetime').exec(callback);
};


pictureFactory.getLastPicture = function(callback){
  pictures.findOne().sort({ datetime : 'desc' }).exec(callback);
};


pictureFactory.likeLastPicture = function(){
    pictures.findOne().sort({ datetime : 'desc' }).exec(
      function(err,result){
        if(err){
          console.log("Une erreur ",err);
        }else{
          pictures.findOneAndUpdate({"datetime":result.datetime}, {"type":"heart"} ,function(err){
            if(err){
                log.alert('Errors during picture data updating : ',err);
            }else{
              log.info('Picture status successfully update with '+newStatus);
            }
          });
        }
      });
};

pictureFactory.updateStatusPictureByDatetime = function(datetime,newStatus){
    pictures.findOneAndUpdate({"datetime":datetime}, {"status":newStatus} ,function(err){
      if(err){
          log.alert('Errors during picture data updating : ',err);
      }else{
        log.info('Picture status successfully update with '+newStatus);
      }
    });
};



locationFactory.getOneLocationByFilter = function(filter,callback){
    locations.findOne(filter).sort('datetime').exec(callback);
};


locationFactory.updateStatusLocationByDatetime = function(datetime,newStatus){
  if(newStatus != null && datetime != null){
    locations.findOneAndUpdate({"datetime":datetime}, {"status":newStatus} ,function(err){
      if(err){
          log.alert('Errors during location data updating : ',err);
      }else{
        log.info('Location status successfully update with '+newStatus);
      }
    });
  }else{
    log.info('Bad parameters');
  }

};

locationFactory.insertData = function(date, data){
 var create = new locations({datetime: date,  longitude: data.longitude,  latitude: data.latitude,  altitude : data.altitude, speed : data.speed ,status: 'created'});
   create.save(function (err) {
    if (err) { throw err; }
    log.info('Location inserted on database');
  });
};
