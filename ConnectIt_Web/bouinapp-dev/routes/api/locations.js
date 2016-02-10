var express = require('express');
var businessLocations = require('../../business/businessLocations');
var log = require("./../../tools/logger");
var router = express.Router();

/* 
	GET all images.
	@return all images in database
*/
router.get('/', function(req, res, next) {
	var toto = businessLocations.getOne();
	toto = "nutnutnut";
  res.send('respond with a resource : ' + toto);
});

/*
	GET "highlights of the day" images
	@return highlights images of the day
*/
router.get('/highlights', function(req, res, next) {
	var locations = businessLocations.getLocationByDay( day,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get highlights of images.");
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/* 
	GET daily images. 
	@param {string} Wanted day
	@return 
*/
router.get('/daily/:day', function(req, res, next) {
	requestedDay = req.params.day;
	console.log(requestedDay);
	var locations = businessLocations.getLocationByDay(requestedDay,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

module.exports = router;
