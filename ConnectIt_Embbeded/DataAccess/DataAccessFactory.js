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
  status: String
});

//create a new model with the scema
var users = mongoose.model('users',schema);
var locations = mongoose.model('locations',locationSchema);
var pictures = mongoose.model('pictures',pictureShotSchema);



pictureFactory.insertPicture = function(date,path){
 var create = new pictures({datetime: date,localPath: path ,status: 'created'});
   create.save(function (err) {
    if (err) { throw err; }
    log.log('Pictures '+path+' inserted on database');
  });
};

locationFactory.insertData = function(date, data){
 var create = new locations({datetime: date,  longitude: data.longitude,  latitude: data.latitude,  altitude : data.altitude, speed : data.speed ,status: 'created'});
   create.save(function (err) {
    if (err) { throw err; }
    log.log('Location inserted on database');
  });
};
