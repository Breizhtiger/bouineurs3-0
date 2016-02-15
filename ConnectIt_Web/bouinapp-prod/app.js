var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var database = require('./dataAccess/database');
var log = require("./tools/logger");

var index = require('./routes/index');
var soprasteria = require('./routes/soprasteria');
var contributor = require('./routes/contributor');
var bouineursMagicTeam = require('./routes/bouineursMagicTeam');
var onlive = require('./routes/onlive');
var supervision = require('./routes/supervision');
var apiImage = require('./routes/api/images');
var apiLocation = require('./routes/api/locations');
var apiSupervision = require('./routes/api/supervision');

var app = express();
var logDirectory = __dirname + '/log/access';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: "daily",
  date_format: "DD-MM-YYYY",
  verbose: false
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));


app.use('/', index);
app.use('/soprasteria', soprasteria);
app.use('/contributor', contributor);
app.use('/bouineursMagicTeam', bouineursMagicTeam);
app.use('/onlive', onlive);
app.use('/supervision', supervision);
app.use('/api/images', apiImage);
app.use('/api/locations', apiLocation);
app.use('/api/supervision', apiSupervision);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

log.info("Lancement de l'application web en mode : "+app.get('env'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error("Error :\n Status: ", err.status + "\n Stack trace : ", err.message);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
