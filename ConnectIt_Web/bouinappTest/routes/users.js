var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({name:'test'});
});

/* GET users listing. */
router.get('/positions', function(req, res, next) {
  //les positions
  res.send([
    {lat: -25.363, lng: 131.044},
    {lat: -26.301256, lng: 125.150},
    {lat: -27.301256, lng: 124.150},
    {lat: -28.301256, lng: 121.150},
    {lat: -29.301256, lng: 129.150},
    {lat: -26.988, lng: 128.150}

  ]);
});

/* GET users listing. */
router.get('/messages', function(req, res, next) {
  //ici ton code qui récupère de la bdd
  var message = 'un truc venant de la BDD, l heure (en timestamp): '+Date.now();
  res.send(message);
});

module.exports = router;
