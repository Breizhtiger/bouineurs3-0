var express = require('express');
// Inclusion de Mongoose
var mongoose = require('mongoose');
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



// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://54.93.89.27/test', function(err) {
  if (err) { throw err; }
});
 
// Création du schéma pour les commentaires
// var commentaireArticleSchema = new mongoose.Schema({
  // pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  // contenu : String,
  // date : { type : Date, default : Date.now }
// });
 
// Création du Model pour les commentaires
// var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);
 
 
/* GET users listing. */
// router.get('/messages', function(req, res, next) {
  // //ici ton code qui récupère de la bdd
 // // var message = 'un truc venant de la BDD, l heure (en timestamp): '+Date.now();
  // var query = CommentaireArticleModel.find(null); 
	// query.exec(function (err, comms) {
	  // if (err) { throw err; }
	
  // res.send(comms[0].contenu);
	// });
// });

/* GET images properties */
// Création du schéma pour les images
var imagePropertiesShema = new mongoose.Schema({
  name : String,//, match: /^[a-zA-Z0-9-_]+$/ },
  path : String,
  GPS_coordinates : String,
  speed : String,
  date : { type : Date, default : Date.now  },
  heure : String
});
 
// Création du Model pour les images
var imagePropertiesModel = mongoose.model('image', imagePropertiesShema);
 
 
router.get('/images', function(req, res, next) {
  //ici ton code qui récupère de la bdd
 // var message = 'un truc venant de la BDD, l heure (en timestamp): '+Date.now();
  var query = imagePropertiesModel.find(null); 
	query.exec(function (err, images) {
		if (err) { throw err; }
		res.send(images[0].name);
	});
});

module.exports = router;
