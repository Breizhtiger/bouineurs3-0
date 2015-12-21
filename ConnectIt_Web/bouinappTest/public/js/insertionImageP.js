// Inclusion de Mongoose
var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
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
var imagePropertiesModel = mongoose.model('images', imagePropertiesShema);
 

// On crée une instance du Model
var monImage = new imagePropertiesModel({ name : 'prout4.jpg' });
monImage.path = '/home/pouet/';
 
// On le sauvegarde dans MongoDB !
monImage.save(function (err) {
  if (err) { throw err; }
  console.log('Image ajouté avec succès !');
  // On se déconnecte de MongoDB maintenant
  mongoose.connection.close();
});