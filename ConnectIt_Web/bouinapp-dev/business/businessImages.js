var express = require('express');
var mongoose = require('mongoose');

var businessImages = {};

mongoose.connect('mongodb://54.93.89.27/dev', function(err) {
  if (err) { throw err; }
});


var pictureShotSchema = new mongoose.Schema({
  datetime: Date,
  localPath: String,
  status: String,
  type : String
});


//create a new model with the scema
var images = mongoose.model('images', pictureShotSchema);

businessImages.getOne = function(){
	return "toto";
};

businessImages.getHighlightsOfTheDay = function(callback){
	var query = images.find({"type":"OK"}).limit(5);
	var promise= query.exec();

	promise.then( function(result){
		callback(result);
	});
};

module.exports = businessImages;