var mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.2/connectIt');

//connection to database
var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
    console.log("je suis ok");
    });


//creation of schema
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

var testBdd = {};
var pictureFactory = {};
exports.testBdd = testBdd;
exports.pictureFactory = pictureFactory;

pictureFactory.insertPicture = function(date,path){
 var create = new pictures({datetime: date,localPath: path ,status: 'created'});
   create.save(function (err) {
    if (err) { throw err; }
    console.log('Photo ajouté avec succès !');
  });
};

testBdd.insertTest = function(stringTest){
 var test = new users({name : stringTest});
   test.save(function (err) {
    if (err) { throw err; }
    console.log('Commentaire ajouté avec succès !');
  });
};

testBdd.getAllFromTest = function(){
  users.find({},function(err,data){
    if (err) { throw err; }
    console.log('data ', data);
  });
};
