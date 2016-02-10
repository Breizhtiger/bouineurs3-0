var mongoose = require('mongoose');
var log = require("../tools/logger");

// mongoose.connect('mongodb://54.93.89.27/dev', function(err) {
mongoose.connect('mongodb://54.93.53.233/devTestDay3', function(err) {
	if (err) {
		log.error("Error connecting mongo ! Error : " + err);
	}
	else{
		log.info("Connexion mongo OK");
	}
});

mongoose.connection.on('error', function(){
	log.error("Erreur connexion mongoDB. Throwing error !");
	throw new Error("MongoException");
});
