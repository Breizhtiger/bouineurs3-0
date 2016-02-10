var express = require('express');
var businessImages = require('../../business/businessImages');
var log = require("./../../tools/logger");
var router = express.Router();


/* 
	GET all images.
	@return all images in database
*/
router.get('/', function(req, res, next) {
	var images = businessImages.getAllImages(
		function(error, result){
			if(error === null){
				res.status(200).json(images);
			}
			else{
				log.error("Error while trying to get all images.");
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/*
	GET "highlights of the day" images
	@return highlights images of the day
*/
router.get('/highlights', function(req, res, next) {
	var images = businessImages.getHighlightsOfTheDay(
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get highlights of the day.");
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/* 
	GET images of given day
	@param {string} Wanted day
	@return images of wanted day
*/
router.get('/daily/:day', function(req, res, next) {
	requestedDay = req.params.day;

	var images = businessImages.getImagesOfTheDay(requestedDay,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get images of the day:"+requestedDay);
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

/* 
	GET images of given day
	@param {string} Wanted day
	@return images of wanted day
*/
router.get('/getByKey/:key', function(req, res, next) {
	requestedkey = req.params.key;

	var images = businessImages.getImageByDateKey(requestedkey,
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get image by key:"+requestedkey);
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

module.exports = router;

