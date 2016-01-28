var express = require('express');
var mongoose = require('mongoose');

var businessImages = {};

mongoose.connect('mongodb://54.983.89.27/dev', function(err) {
  	if (err) { 
  		console.log("Error connecting mongo ! Error : " + err);
 	}
});

mongoose.connection.on('error', function(){
		throw new Error("MongoException");
});

var pictureShotSchema = new mongoose.Schema({
  datetime: Date,
  localPath: String,
  status: String,
  type : String
});


//create a new model with the scema
var images = mongoose.model('images', pictureShotSchema);

businessImages.getOne = function(){
	// TO DO
};

/*
	GET highlight photos of the day
	@param callback : Callback function to call after treatment
*/	
businessImages.getHighlightsOfTheDay = function(callback){
	var fromDate = new Date().setHours(0,0,0);
	var tillDate = new Date().setHours(23,59,59);
	var query = images.find(
		{"datetime": {"$gte": new Date(fromDate).toISOString(), "$lt": new Date(tillDate).toISOString()}, "type":"heart"},
		function(err, images){
			if(err) return next(err);
		}).limit(5);

	var promise= query.exec();

	promise.then(function(result){
		console.log("OK !");
		callback(null, result);
	}, function(error){
		console.log("KO");
		callback(error, result);
	});
};

businessImages.insertPicture = function(date, path, status, type){
 var create = new images({"datetime": date, "localPath": path, "status": 'created', "type": type});
   create.save(function (err) {
    if (err) { throw err; }
    console.log('Pictures '+path+' inserted on database');
  });
};

module.exports = businessImages;