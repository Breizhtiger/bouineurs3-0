/***********************
* Dashboard.js
* Entry Point of Dashboard application
* Enables to manage the 3.0 system with a web app
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var path = require('path');
var pm2 = require('pm2');
var when = require('when');
/* Instanciation*/
var log = toolsFactory.loggerFactory.dashboardLogger;
var dataFactory = require('./DataAccess/DataAccessFactory.js');
var dashboardBusiness = require('./Business/businessFactory.js').dashboardBusiness;

var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
        if(result != null && result.localPath != null ){
          var pathArray = result.localPath.split('/');
          var newPath = 'output/'+pathArray[pathArray.length-1];
          res.send({path : newPath, type : result.type});
        }else{

        }
      }
    });
});


app.get('/picturesStatus',function(req, res){
    var nbCreated = 0;
    var nbSended = 0;
    dataFactory.pictureFactory.countByStatus('created',function(err,result){
      if(err){
        console.log("Une erreur ",err);
      }else{
        nbCreated = result;
        dataFactory.pictureFactory.countByStatus('Send',function(err,result){
          if(err){
            console.log("Une erreur ",err);
          }else{
            nbSended = result;
              dataFactory.pictureFactory.countByStatus('SendAndDelete',function(err,result){
              if(err){
                console.log("Une erreur ",err);
              }else{
                nbSended = nbSended + result;
                res.send({created : nbCreated, sended : nbSended});
              }
            });
          }
        });
      }
    });
});


//API:GET Return the last picture
app.get('/takePicture',function(req, res){
      dashboardBusiness.takeSimplePicture(false);
      res.status(200).send('OK');
});

//API:GET Return the last picture
app.get('/heartOnYou',function(req, res){
      dashboardBusiness.takeSimplePicture(true);
    res.status(200).send('OK');
});


//API:GET Return the last picture
app.get('/likeLastPicture',function(req, res){
      dataFactory.pictureFactory.likeLastPicture();
      res.status(200).send('OK');
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

app.get('/goProIsUp',function(req,res){
    dashboardBusiness.goProIsUp().then(function(value){
      res.send(value);
    });
});

app.post('/actionsProcess',function(req,res){

  if(req.body != null && req.body.action != null && req.body.processName != null){
    console.log("je recois, ",req.body.action);
    var action = req.body.action;
    var processName = req.body.processName;

    switch(action) {
          case 'STOP':
              pm2.connect(function() {
                pm2.stop(processName,function(err, proc){
                    if(err){
                      console.log(err);
                    }else{
                    }
                });
              });
              break;
          case 'RESTART':
              pm2.connect(function() {
                pm2.restart(processName,function(err, proc){
                    if(err){
                      console.log(err);
                    }else{
                    }
                });
              });
              break;
          case 'KILL':
              break;
    }
    res.send("OK");
  }else{
    res.send("OUPS");
  }

});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  log.info('Dashboard web app at http://%s:%s', host, port);
});
