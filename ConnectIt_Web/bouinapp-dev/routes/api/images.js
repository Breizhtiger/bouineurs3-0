var express = require('express');
var businessImages = require('../../business/businessImages');
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
				res.status(200).json(images);
			}
			else{
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
	var images = businessImages.getImagesOfTheDay(day,
		function(error, result){
			if(error === null){
				res.status(200).json(images);
			}
			else{
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});

module.exports = router;

