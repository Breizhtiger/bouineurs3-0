/***********************
* Dashboard.js
* Entry Point of Dashboard application
* Enables to manage the 3.0 system with a web app
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var path = require('path');
var pm2 = require('pm2');
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
        res.send({path : result.localPath, type : result.type});
      }
    });
});


//API:GET Return the last picture
app.get('/takePicture',function(req, res){
      dashboardBusiness.takeSimplePicture(false);
      res.send("OK");
});

//API:GET Return the last picture
app.get('/heartOnYou',function(req, res){
      dashboardBusiness.takeSimplePicture(true);
      res.send("OK");
});


//API:GET Return the last picture
app.get('/likeLastPicture',function(req, res){
      dataFactory.pictureFactory.likeLastPicture();
      res.send("OK");

});

app.get('/currentProcess',function(req,res){

  pm2.connect(function() {
    pm2.list(function(err, list){
        if(err){
          console.log(err);
        }else{        
          res.send(list);
        }
    });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  log.info('Dashboard web app at http://%s:%s', host, port);
});
