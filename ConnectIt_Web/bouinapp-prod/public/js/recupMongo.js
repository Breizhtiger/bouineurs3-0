// CommentaireArticleModel.find(null, function (err, comms) {
  // if (err) { throw err; }
 //// comms est un tableau de hash
  // console.log(comms);
// });

// Inclusion de Mongoose
var mongoose = require('mongoose');
 
// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://54.93.89.27/local', function(err) {
  if (err) { throw err; }
});
 
// Création du schéma pour les commentaires
var commentaireArticleSchema = new mongoose.Schema({
  pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  contenu : String,
  date : { type : Date, default : Date.now }
});
 
// Création du Model pour les commentaires
var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);
 
 
// Ici on va récupérer les 3 premiers commentaires ayant le pseudo Atinux
//var query = CommentaireArticleModel.find(null);
//query.where('pseudo', 'Lutine');
//query.limit(3);
// peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
/* query.exec(function (err, comms) {
  if (err) { throw err; }
  // On va parcourir le résultat et les afficher joliment
  var comm;
  for (var i = 0, l = comms.length; i < l; i++) {
    comm = comms[i];
    console.log('------------------------------');
    console.log('Pseudo : ' + comm.pseudo);
    console.log('Commentaire : ' + comm.contenu);
    console.log('Date : ' + comm.date);
    console.log('ID : ' + comm._id);
    console.log('------------------------------');
  } */
       
   
   app.get('/', function(req, res) {
         var query = CommentaireArticleModel.find(null), function (err, comms) {
            
            res.render('index.html',{result: comms});   
        });
   
});