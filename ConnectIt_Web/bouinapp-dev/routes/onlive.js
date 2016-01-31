var express = require('express');
var router = express.Router();
var tools = require("../tools/tools")

/* GET onlive default page. */
router.get('/', function(req, res, next) {
	res.render('onlive', { title: 'Default page' });
});

/* GET onlive by day page. */
router.get('/:day', function(req, res, next) {
	requestedDay = req.params.day;
	dayInformation= tools.getVariousInformationForADay(requestedDay);
	res.render('onlive', dayInformation);
});

/* GET onlive - maps by day page. */
router.get('/maps/:day', function(req, res, next) {
	requestedDay = req.params.day;
	dayInformation= tools.getVariousInformationForADay(requestedDay);
	console.log("OK");
	res.render('onliveMaps', dayInformation);
});

/* GET onlive - photos by day page. */
router.get('/photos/:day', function(req, res, next) {
	requestedDay = req.params.day;
	dayInformation= tools.getVariousInformationForADay(requestedDay);
	res.render('onlivePhotos', dayInformation);
});

module.exports = router;
