var winston = require('winston');
var fs = require('fs');
var logger = {};

var logDirectory = process.cwd()+ '/log/applicative';

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'applicative.log' })
    ]
});

module.exports = logger;