var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('soprasteria', { title: 'Sopra Steria partenaire des "Bouineurs 3.0" !' });
});

module.exports = router;
