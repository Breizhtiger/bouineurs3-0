var express = require('express');
var mongoose = require('mongoose');
var tools = require("../tools/tools");
var _ = require("underscore");
var log = require("../tools/logger");
var businessImages = require("./businessImages");

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

businessLocations.getLocationWithPhotoByDay = function(day, callback){
	var query = locations.find({
								"datetime": {"$gte": tools.getFirstTimeOfTheDay(day), "$lt": tools.getLastTimeOfTheDay(day)},
								"longitude":{$exists:true, $ne : null},
								"latitude":{$exists:true, $ne : null}
								},
		function(err, locations){
			if(err) return next(err);
		}).lean();

	var promise= query.exec();

	promise.then(function(resultLocation){
		log.info("Fonction getLocationWithPhotoByDay  : Recuperation localisations terminé");
		// resultLocation = resultLocation.toArray();
		if(resultLocation != null && resultLocation.length !=0){
			log.info("Données localisations non nulles. Croisement avec les images.");
			businessImages.getImagesOfTheDay(day, function(error, resultImg){
				log.info("Recuperation images terminé.");
				if(error != "null" && resultImg != null && resultImg.length !=0){
					log.info("Données images non nulles.");

					for(var i= 0;i < resultLocation.length ; i++ ){
						log.info("Debut croisement avec localisations.");

						imageForLocation = _.filter(resultImg, function(obj){
							return ''+obj.datetime == ''+resultLocation[i].datetime;
						});
						
						if(!_.isUndefined(imageForLocation)){
							log.info("Match trouvé !");
							resultLocation[i].publicPath = imageForLocation[0].publicPath;
						}
						else{
							log.info("Match non trouvé !");
							resultLocation[i].publicPath = null;
						}
					}
					log.info("Fin croisement avec localisations.");
					callback(null, resultLocation);
				}
				else{
					log.error("Error while trying to get photos of the day for these locations. Day  :"+ requestedDay);
					callback(null, resultLocation);
				}
			});
		}
		else{			
			log.info("Données localisations nulles.");
			callback(null, resultLocation);
		}
	}, function(error){
		callback(error, resultLocation);
	});
};


businessLocations.insertLocation = function(date, longitude, latitude, altitude, speed) {
	var create = new locations({"datetime": date, "longitude": longitude, "latitude": latitude, "altitude": altitude, "speed":speed});
	create.save(function (err) {
		if (err) {
			log.error("Erreur à l'insertion de la localisation.");
			throw err;
		}

		log.info("Localisation insere avec succes. Datetime: ", date);
	});
};


module.exports = businessLocations;