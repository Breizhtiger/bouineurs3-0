var businessImages = require('./business/businessImages.js');

var date = Date.now();
var path = "http://www.bouineurs3-0.fr/static/images/id-Flo.jpg";
var status = "created";
var type = "heart";

for(i=0;i<10;i++){
	businessImages.insertPicture(date, path, status, type);
}
