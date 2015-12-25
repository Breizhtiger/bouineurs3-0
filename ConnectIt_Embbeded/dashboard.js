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



var express = require('express');
var app = express();
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  log.info('Dashboard web app at http://%s:%s', host, port);
});
