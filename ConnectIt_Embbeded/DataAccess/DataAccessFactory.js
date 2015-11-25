var mongoose = require('mongoose');
var toolsFactory = require('./Tools/tools.js');
var testBdd = {};
var pictureFactory = {};
exports.testBdd = testBdd;
exports.pictureFactory = pictureFactory;

mongoose.connect('mongodb://172.17.0.2/connectIt');

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
  latitude: Number
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
