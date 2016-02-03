var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');
var ss = require('socket.io-stream');
var fs = require('fs');
var path = require('path');
var businessImages = require('./businessImages');
var businessLocations = require('./businessLocations');
var businessSocket = {};

businessSocket.init = function(server){
	// Attach socket on server listen
	io = io.listen(server);

	// Start binding connection event
	 io.sockets.on('connection', function (socket) {
	 console.log('Un client est connecté ! ');
	 	socket.emit('message', 'Vous êtes bien connecté !');

	 	//socket fullData
	 	ss(socket).on('fullData', function(stream, data) {
			// un peu degueulasse, selon le temps on corrigera
		var location = {
			  datetime: data.location._doc.datetime,
			  longitude: data.location._doc.longitude,
			  latitude: data.location._doc.latitude,
			  altitude : data.location._doc.altitude,
			  speed : data.location._doc.speed,
			  status: data.location._doc.status
			};
	 		console.log("I receive fulldata ->",data);
			console.log("try to save ->",location);
	 		var filename = __dirname+'/output/'+ path.basename(data.name);
			if(data.datetime!= null){
				try{
					//SAVE Pictures
					businessImages.insertPicture(data.datetime, filename, 'normal');
					businessLocations.insertLocation(data.datetime, location.longitude, location.latitude, location.altitude, location.speed);
				}catch(e){
					var datetime = Date.now();
					//SAVE Pictures
					businessImages.insertPicture(datetime, filename, 'normal');
					businessLocations.insertLocation(datetime, location.longitude, location.latitude, location.altitude, location.speed);
				}
			}
	 		stream.pipe(fs.createWriteStream(filename));
	 	});

	 	// Bind socket deconnection
	 	socket.on('disconnect', function (socket) {
	 		console.log('Un client est déconnecté !');
	 	});
	 });
};

module.exports = businessSocket;
