// Inclusion de Mongoose
var mongoose = require('mongoose');
 
 
mongoose.connect('mongodb://54.93.89.27/test', function(err) {
  if (err) { throw err; }
});

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
 
 
var query = imagePropertiesModel.find(null);
// peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
 query.exec(function (err, image) {
  if (err) { throw err; }
  // On va parcourir le résultat et les afficher joliment
  console.log('coucou');
  console.log('coucou' + image[0]);   
  var comm;
  for (var i = 0, l = image.length; i < l; i++) {
    comm = image[i];
    console.log('------------------------------');
    console.log('Name : ' + comm.name);
    console.log('Path : ' + comm.path);
    console.log('Speed : ' + comm.speed);
  }
 });
  
// router.get('/images', function(req, res, next) {
  // //ici ton code qui récupère de la bdd
 // // var message = 'un truc venant de la BDD, l heure (en timestamp): '+Date.now();
  // var query = imagePropertiesModel.find(null); 
	// query.exec(function (err, images) {
		// if (err) { throw err; }	
		// res.send(images[0].speed);
	// });
// });