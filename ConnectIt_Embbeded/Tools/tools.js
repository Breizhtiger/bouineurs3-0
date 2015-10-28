
/*libraries inclusion*/
var winston = require('winston');

/*Initialisation of the module*/
var loggerFactory = {}
exports.loggerFactory = loggerFactory;

/*LoggerFactory*/
loggerFactory.collectLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'collect_logs.log' })
    ]
  });
