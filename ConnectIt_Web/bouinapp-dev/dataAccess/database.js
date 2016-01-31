var mongoose = require('mongoose');

mongoose.connect('mongodb://54.93.89.27/dev', function(err) {
	if (err) { 
		console.log("Error connecting mongo ! Error : " + err);
	}
});

mongoose.connection.on('error', function(){
	throw new Error("MongoException");
});