var collectBusiness = {};
var dataFactory = require('../DataAccess/DataAccessFactory.js')
exports.collectBusiness = collectBusiness;

collectBusiness.insertTest = function(stringName){
  dataFactory.testBdd.insertTest(stringName);
};
collectBusiness.getAllTest = function(){
  dataFactory.testBdd.getAllFromTest();
};
