var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/picture', function (req, res) {
  console.log("-> ",req.body);
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/*

curl \
  -F "userid=1" \
  -F "date=date" \
  -F "image=@/home/anthony/test.png" \
  localhost:3000/picture

*/
