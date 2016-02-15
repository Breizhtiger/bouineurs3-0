var express = require('express');
var businessImages = require('../../business/businessImages');
var log = require("./../../tools/logger");
var router = express.Router();

/* 
	GET count of elements in images database
	@return all images in database
*/
router.get('/', function(req, res, next) {
	var images = businessImages.countPictures(
		function(error, result){
			if(error === null){
				res.status(200).json(result);
			}
			else{
				log.error("Error while trying to get result of supervision.");
				res.send(500, {message: 'Internal server error'});
			}
		}
	);
});


module.exports = router;