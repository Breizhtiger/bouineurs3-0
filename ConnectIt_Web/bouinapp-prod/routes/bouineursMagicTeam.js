var express = require('express');
var router = express.Router();

/* GET bouineursMagicTeam page. */
router.get('/', function(req, res, next) {
  res.render('bouineursMagicTeam');
});

module.exports = router;
