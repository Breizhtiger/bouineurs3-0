var mongoConnect = require('./dataAccess/database.js');
var businessImages = require('./business/businessImages.js');

var dateTab = ["2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z"];

var path = "/home/bouineurs/bouineurs3-0/ConnectIt_Web/bouinapp-dev/public/daily/1002/photos/1455142879619.jpg";
var status = "created";
var type = "heart";

for(i=0;i<10;i++){
	businessImages.insertPicture(dateTab[i], path+''+i+'.jpg', status, type);
	console.log("OK!");
}
