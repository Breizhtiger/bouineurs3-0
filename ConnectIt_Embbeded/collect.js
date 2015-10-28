/***********************
* Collect.js
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var collectBusiness = require('./Business/businessFactory.js').collectBusiness;
/* Instanciation*/
var log = toolsFactory.loggerFactory.collectLogger;

log.info("Application Collect Start");
collectBusiness.getAllTest();
collectBusiness.insertTest("coucou "+ new Date());
collectBusiness.getAllTest();
