var express = require('express');
var businessLocations = require('../../business/businessLocations');
var log = require("./../../tools/logger");
var router = express.Router();

/* 
	GET all locations
	@return all images in database
*/
router.get('/', function(req, res, next) {
	var locations = businessLocations.getAllLocations(
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get all locations.");
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/* 
	GET daily locations. 
	@param {string} Wanted day
	@return 
*/
router.get('/daily/:day', function(req, res, next) {
	requestedDay = req.params.day;
	var locations = businessLocations.getLocationByDay(requestedDay,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get location for day  :"+ requestedDay);
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/* 
	GET daily locations. 
	@param {string} Wanted day
	@return 
*/
router.get('/dailyWithPhoto/:day', function(req, res, next) {
	requestedDay = req.params.day;
	var locations = businessLocations.getLocationWithPhotoByDay(requestedDay,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get location for day  :"+ requestedDay);
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});


module.exports = router;
