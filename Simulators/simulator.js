console.log("Simulator Started ...");
var gpsBusiness = require('./Business/BusinessFactory.js').gpsBusiness;
//todo : init requirements, variables ...

console.log("Clean all moq files...");
//todo : clean all files
gpsBusiness.initGpsSimulator();
console.log("GPS Simulator Started on the files /truc/test");
//todo : launch GPS simulator
gpsBusiness.startGpsSimulator();
console.log("Temp Sensor Simulator Started on the files /truc/test/temp1");
//todo : launch Temp Sensor 1 simulator
