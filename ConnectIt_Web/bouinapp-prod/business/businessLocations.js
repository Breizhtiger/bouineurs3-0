var express = require('express');
var mongoose = require('mongoose');

var businessLocations = {};

// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.connect('mongodb://54.93.89.27/test', function(err) {
  if (err) { throw err; }
});

var locationSchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now() },
  longitude: Number,
  latitude: Number,
  altitude : Number,
  speed : Number,
  status: String
});

//create a new model with the scema
var locations = mongoose.model('locations',locationSchema);

businessLocations.getOne = function(){
	
  locations.findOne({status: 'created'}).sort('datetime').exec(callback);
	return "toto";
}

module.exports = businessLocations;