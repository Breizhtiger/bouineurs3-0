var mongoConnect = require('./dataAccess/database.js');
var businessLocations = require('./business/businessLocations.js');

var date = Date.now();
var longitudeTab = ["48.776400","48.785400","48.796400","48.806400","48.816400","48.826400","48.836400","48.846400","48.856400","48.866400"];
var latitudeTab = ["2.320890","2.330890","2.340890","2.350890","2.360890","2.380890","2.390890","2.400890","2.410890","2.420890"]
var altitude = "20";
var speed = "30";

for(i=0;i<10;i++){
	businessLocations.insertLocation(date, longitudeTab[i], latitudeTab[i], altitude, speed);
	console.log("OK!" );
}
