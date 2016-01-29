var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./dataAccess/database');

var index = require('./routes/index');
var soprasteria = require('./routes/soprasteria');
var contributor = require('./routes/contributor');
var bouineursMagicTeam = require('./routes/bouineursMagicTeam');
var onlive = require('./routes/onlive');
var apiImage = require('./routes/api/images');
var apiLocation = require('./routes/api/locations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(__dirname + '/public'));


app.use('/', index);
app.use('/soprasteria', soprasteria);
app.use('/contributor', contributor);
app.use('/bouineursMagicTeam', bouineursMagicTeam);
app.use('/onlive', onlive);
app.use('/api/images', apiImage);
app.use('/api/locations', apiLocation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log(app.get('env'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("Error :\n Status: "+ err.status + "\n Stack trace : " + err.message);
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
