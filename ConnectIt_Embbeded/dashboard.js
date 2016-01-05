/***********************
* Dashboard.js
* Entry Point of Dashboard application
* Enables to manage the 3.0 system with a web app
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var path = require('path');
/* Instanciation*/
var log = toolsFactory.loggerFactory.dashboardLogger;
var dataFactory = require('./DataAccess/DataAccessFactory.js');
var dashboardBusiness = require('./Business/businessFactory.js').dashboardBusiness;


var express = require('express');
var app = express();
app.use('/static', express.static('public'));
app.use('/output', express.static('output'));

//WEB:GET Page of the DashBoard
app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


//API:GET Return the last picture
app.get('/lastPicture',function(req, res){

    dataFactory.pictureFactory.getLastPicture(function(err,result){
      if(err){
        console.log("Une erreur ",err);
      }else{
        res.send({path : result.localPath});
      }
    });
});


//API:GET Return the last picture
app.get('/takePicture',function(req, res){
      dashboardBusiness.takeSimplePicture();
      res.send("OK");
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  log.info('Dashboard web app at http://%s:%s', host, port);
});
