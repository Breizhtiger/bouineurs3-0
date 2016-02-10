var express = require('express');
var mongoose = require('mongoose');
var tools = require("../tools/tools");
var log = require("../tools/logger");

var businessImages = {};

var pictureShotSchema = new mongoose.Schema({
  datetime: Date,
  localPath: String,
  publicPath: String,
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
	var query = images.find({
						"datetime": {"$gte": new Date(fromDate).toISOString(), "$lt": new Date(tillDate).toISOString()},
						"type":"heart",
						"publicPath" : {$exists:true, $ne : null}
						},
		function(err, images){
			if(err) return next(err);
		}).limit(5);

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};

/*
	Get photos of given day
	@param day : Wanted day (format day1, day2, day3...)
	@param callback : Callback function to call after treatment
*/
businessImages.getImagesOfTheDay = function(day, callback){
	var query = images.find({
							"datetime": {"$gte": tools.getFirstTimeOfTheDay(day), "$lt": tools.getLastTimeOfTheDay(day)}
							},
		function(err, images){
			if(err){
				console.log(err);
			}
		});

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};

/*
	Get photos of given key
	@param day : Desired day at ISO format
	@param callback : Callback function to call after treatment
*/
businessImages.getImageByDateKey = function(key, callback){
	var query = images.find(
							{"datetime": key
						},
		function(err, images){
			if(err){
				console.log(err);
			}
		}).limit(1);

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};

businessImages.insertPicture = function(date, path, type){
	var publicPath = tools.transformLocalPathToPublicPath(path);
	var create = new images({"datetime": date, "localPath": path, "publicPath": publicPath, "status": 'created', "type": type});
	create.save(function (err) {
		if (err) { console.log("ERREUR");throw err; }
		log.info('Pictures '+path+' inserted on database');
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

module.exports = businessImages;
