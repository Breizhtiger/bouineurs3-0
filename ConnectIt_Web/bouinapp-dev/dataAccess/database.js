var mongoose = require('mongoose');
/*var dataFactory = {};
exports.dataFactory = dataFactory;*/
//creation of schemas
/*
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
  type : { type: String, default: 'normal' }
});
*/
/*
var locations = mongoose.model('locations',locationSchema);
var pictures = mongoose.model('pictures',pictureShotSchema);

*/
// mongoose.connect('mongodb://54.93.89.27/dev', function(err) {
mongoose.connect('mongodb://52.59.249.149/dev', function(err) {
	if (err) {
		console.log("Error connecting mongo ! Error : " + err);
	}
	else{
		console.log("Connexion mongo OK");
	}
});

mongoose.connection.on('error', function(){
	console.log("Erreur !");
	throw new Error("MongoException");
});

/*
dataFactory.insertPicture = function(date,path,typePicture){
 var create = new pictures({datetime: date,localPath: path ,status: 'created', type: typePicture});
   create.save(function (err) {
    if (err) { throw err; }
    log.info('Pictures '+path+' inserted on database');
  });
};

dataFactory.insertLocation = function(date, data){
 var create = new locations({datetime: date,  longitude: data.longitude,  latitude: data.latitude,  altitude : data.altitude, speed : data.speed ,status: 'created'});
   create.save(function (err) {
    if (err) { throw err; }
    log.info('Location inserted on database');
  });
};*/
