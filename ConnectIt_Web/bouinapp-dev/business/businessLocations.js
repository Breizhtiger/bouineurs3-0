var express = require('express');
var mongoose = require('mongoose');

var businessLocations = {};

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