var express = require('express');
var mongoose = require('mongoose');

var businessImages = {};

var pictureShotSchema = new mongoose.Schema({
  datetime: Date,
  localPath: String,
  status: String,
  type : String
});

//	Create a new model with the schema
var images = mongoose.model('images', pictureShotSchema);

/*
	Get all photos (path) stored in database
	@param callback : Callback function to call after treatment
*/	
businessImages.getAllImages = function(callback){
	var query = images.find({},
		function(err, images){
			if(err) return next(err);
		});

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};

/*
	Get highlight photos of the day
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

/*
	Get photos of the day
	@param day : Desired day at ISO format
	@param callback : Callback function to call after treatment
*/	
businessImages.getImagesOfTheDay = function(day, callback){
	var fromDate = day.setHours(0,0,0);
	var tillDate = day.setHours(23,59,59);
	var query = images.find(
		{"datetime": {"$gte": new Date(fromDate).toISOString(), "$lt": new Date(tillDate).toISOString()}},
		function(err, images){
			if(err) return next(err);
		});

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};


businessImages.insertPicture = function(date, path, status, type){
 var create = new images({"datetime": date, "localPath": path, "status": 'created', "type": type});
	create.save(function (err) {
		if (err) { console.log("ERREUR");throw err; }
		console.log('Pictures '+path+' inserted on database');
	});
};

/*
	Count all images present in database
	@param callback : Callback function to call after treatment
*/
businessImages.countPictures = function(callback){
	var query = images.count({},function(error, result){
		if(error != null)
			callback(null, result);
		else
			callback(error, result);
	});
};

// businessImages.savePicture = function(image){
// 	create.save(function (err) {
// 		if (err) { 
// 			throw err; 
// 		}
// 		else{
// 			return true;
// 		}
// 	});
// };

module.exports = businessImages;