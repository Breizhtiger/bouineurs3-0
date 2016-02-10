/***********************
* Provisioning.js
************************/
/* Include */
var toolsFactory = require('./Tools/tools.js');
var provisioningBusiness = require('./Business/businessFactory.js').provisioningBusiness;
/* Instanciation*/
var log = toolsFactory.loggerFactory.provisioningLogger;




log.info("Application Provisioning Start");
try{
  provisioningBusiness.startProvisioning();
}catch(exception){
  log.error('Error during provisioning : ',exception);
}
