var mongoConnect = require('./dataAccess/database.js');
var businessImages = require('./business/businessImages.js');

var dateTab = ["2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z","2016-02-08T20:33:09.896Z"];

var path = "http://54.93.53.233/static/images/image";
var status = "created";
var type = "heart";

for(i=0;i<10;i++){
	businessImages.insertPicture(dateTab[i], path+''+i+'.jpg', status, type);
	console.log("OK!");
}
