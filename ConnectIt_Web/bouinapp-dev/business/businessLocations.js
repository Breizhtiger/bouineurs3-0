var express = require('express');
var mongoose = require('mongoose');
var tools = require("../tools/tools")

var businessLocations = {};

var locationSchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now() },
  longitude: Number,
  latitude: Number,
  altitude : Number,
  speed : Number,
  status: String
});

//create a new model with the scema
var locations = mongoose.model('locations',locationSchema);

/*
	Get all photos (path) stored in database
	@param callback : Callback function to call after treatment
*/		
businessLocations.getAllLocations = function(callback){
	var query = locations.find({
								"datetime": {"$gte": tools.getFirstTimeOfTheDay(day), "$lt": tools.getLastTimeOfTheDay(day)},
								"longitude":{$exists:true, $ne : null},
								"latitude":{$exists:true, $ne : null}
								},
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
	Get all photos (path) stored in database
	@param day : Wanted day (format day1, day2, day3...)
	@param callback : Callback function to call after treatment
*/		
businessLocations.getLocationByDay = function(day, callback){
	var query = locations.find({
								"datetime": {"$gte": tools.getFirstTimeOfTheDay(day), "$lt": tools.getLastTimeOfTheDay(day)},
								"longitude":{$exists:true, $ne : null},
								"latitude":{$exists:true, $ne : null}
								},
		function(err, locations){
			if(err) return next(err);
		});

	var promise= query.exec();

	promise.then(function(result){
		callback(null, result);
	}, function(error){
		callback(error, result);
	});
};

businessLocations.insertLocation = function(date, longitude, latitude, altitude, speed) {
	var create = new locations({"datetime": date, "longitude": longitude, "latitude": latitude, "altitude": altitude, "speed":speed});
	create.save(function (err) {
		if (err) {
			console.log("ERREUR");
			throw err;
		}

		console.log('Locations inserted on database');
	});
};


module.exports = businessLocations;