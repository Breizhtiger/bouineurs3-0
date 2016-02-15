var mongoose = require('mongoose');
var log = require("../tools/logger");

mongoose.connect('mongodb://52.29.53.37/dbProd', function(err) {
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
