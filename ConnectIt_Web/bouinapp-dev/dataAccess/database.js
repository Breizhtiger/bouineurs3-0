var mongoose = require('mongoose');

// mongoose.connect('mongodb://54.93.89.27/dev', function(err) {
mongoose.connect('mongodb://52.59.249.149/dev', function(err) {
	if (err) { 
		console.log("Error connecting mongo ! Error : " + err);
	}
	else{
		console.log("Connexion mongo OK");
	}
});

mongoose.connection.on('error', function(){
	console.log("Erreur !");
	throw new Error("MongoException");
});