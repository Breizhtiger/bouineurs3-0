var express = require('express');
var router = express.Router();

/* GET onlive default page. */
router.get('/', function(req, res, next) {
	console.log("Default page");
	res.render('onlive', { title: 'Default page' });
});

/* GET onlive by day page. */
router.get('/:day', function(req, res, next) {
	requestedDay = req.params.day;
	console.log("Day : "+requestedDay);
	res.render('onlive', { title: 'Day' + requestedDay });
});

module.exports = router;
