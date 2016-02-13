var express = require('express');
var mongoose = require('mongoose');
var tools = require("../tools/tools");
var log = require("../tools/logger");
var fs = require('fs');

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

	var fromDate = new Date();
	fromDate.setDate(fromDate.getDate()-1);
	fromDate.setHours(0,0,0);
	var tillDate = new Date().setHours(23,59,59);
	var query = images.find({
						"datetime": {"$gte": new Date(fromDate).toISOString(), "$lt": new Date(tillDate).toISOString()},
						"type":"heart",
						"publicPath" : {$exists:true, $ne : null}
						},
		function(err, images){
			if(err) return next(err);
		}).sort('-datetime').limit(10);

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
		}).lean();

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

/*
	Check existence of timelaps video for given day
	@param day : Wanted day (format day1, day2, day3...)
	@param callback : Callback function to call after treatment
*/
businessImages.checkExistenceVideoOfTheDay = function(day, callback){
	log.info("Start checking existence of video");
	var response = {};
	var informationAboutTheDay = tools.getVariousInformationForADay(day);
	var wantedDirectoryDateName = "";

	if(informationAboutTheDay != null){
		var wantedDirectoryDateName = informationAboutTheDay.daymonth;
	}
	else{
		log.info("Wanted given day doesn't exists");
		response.directory = "KO";
		response.video = "KO";
		callback(null, response);
	}

	if(wantedDirectoryDateName != null && wantedDirectoryDateName != ""){
		var wantedDirectory = process.cwd()+'/public/daily/'+wantedDirectoryDateName+'/videos';

		fs.access(wantedDirectory, fs.F_OK, (err) => {
			log.info(err ? wantedDirectory +' is not accessible' : wantedDirectory + ' can be access');
			if(!err){
				response.directory = "OK";
			}
			else{
				response.directory = "KO";
				response.video = "KO";
				callback(null, response);
			}

			var fileName = wantedDirectory+'/video.mp4';

			fs.access(fileName, fs.F_OK, (err) => {
				log.info(err ? fileName +' is not accessible' : fileName + ' can be access');
				if(!err){
					response.video = "OK";
					callback(null, response);
				}
				else{
					response.video = "KO";
					callback(null, response);
				}
			});
		});
	}
	else{
		log.info("Wanted given day information are incomplete. No daymonth attribute.");
		response.directory = "KO";
		response.video = "KO";
		callback(null, response);
	}
};

module.exports = businessImages;
