var testBdd = {};
var sqlite3 = require('sqlite3').verbose();
exports.testBdd = testBdd;
var fs = require("fs");
var file = "connectIt.db";

testBdd.insertTest = function(stringTest){
  var db = new sqlite3.Database(file);
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Test VALUES (?)");
    stmt.run(stringTest);
    stmt.finalize();
  });
  db.close();
};

testBdd.getAllFromTest = function(){
  var db = new sqlite3.Database(file);
  db.serialize(function() {
    db.each("SELECT * from Test", function(err, row) {
      console.log(row.id + ": " + row.Name);
    });
  });
  db.close();
};
