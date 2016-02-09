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

/* GET onlive - timelaps by day page. */
router.get('/timelaps/:day', function(req, res, next) {
	requestedDay = req.params.day;

	// Get readable information about date for rendering in page
	dayInformation= tools.getVariousInformationForADay(requestedDay);

	// If datas could exists for requested day
	if(!tools.isBeforeToday(dayInformation)){
		res.render('onliveTimelaps', dayInformation);
	}
	else{
		if(dayInformation != null){
			res.render('onliveNotYet', dayInformation);
		}
		else{
			res.render('onliveNotYet', {fullDateString:"----"});
		}
	}
});

/* GET onlive - maps by day page. */
router.get('/maps/:day', function(req, res, next) {
	requestedDay = req.params.day;

	// Get readable information about date for rendering in page
	dayInformation= tools.getVariousInformationForADay(requestedDay);

	// If datas could exists for requested day
	if(!tools.isBeforeToday(dayInformation)){
		res.render('onliveMaps', dayInformation);
	}
	else{
		if(dayInformation != null){
			res.render('onliveNotYet', dayInformation);
		}
		else{
			res.render('onliveNotYet', {fullDateString:"----"});
		}
	}

});

/* GET onlive - photos by day page. */
router.get('/photos/:day', function(req, res, next) {
	requestedDay = req.params.day;

	// Get readable information about date for rendering in page
	dayInformation= tools.getVariousInformationForADay(requestedDay);

	// If datas could exists for requested day
	if(!tools.isBeforeToday(dayInformation)){
		res.render('onlivePhotos', dayInformation);
	}
	else{
		if(dayInformation != null){
			res.render('onliveNotYet', dayInformation);
		}
		else{
			res.render('onliveNotYet', {fullDateString:"----"});
		}
	}
	
});

module.exports = router;
