var express = require('express');
var businessLocations = require('../../business/businessImages');
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
	var toto = businessLocations.getOne();
  res.send('respond with a resource : ' + toto);
});

/* 
	GET daily images. 
	@param {string} Wanted day
	@return 
*/
router.get('/daily/:day', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
