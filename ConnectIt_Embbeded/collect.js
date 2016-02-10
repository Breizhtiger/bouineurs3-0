/***********************
* Collect.js
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var collectBusiness = require('./Business/businessFactory.js').collectBusiness;
/* Instanciation*/
var log = toolsFactory.loggerFactory.collectLogger;




log.info("Application Collect Start -> ",process.cwd());
try{
  collectBusiness.startCollect();
}catch(exception){
  log.error('Error during collect : ',exception);
}
