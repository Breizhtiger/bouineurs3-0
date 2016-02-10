var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');
var ss = require('socket.io-stream');
var fs = require('fs');
var path = require('path');
var businessImages = require('./businessImages');
var businessLocations = require('./businessLocations');
var tools = require("../tools/tools");
var businessSocket = {};

businessSocket.init = function(server){
	// Attach socket on server listen
	io = io.listen(server);
console.log(process.cwd());
	// Start binding connection event
	 io.sockets.on('connection', function (socket) {
	 console.log('Un client est connecté ! ');
	 	socket.emit('message', 'Vous êtes bien connecté !');

	 	//socket fullData
	 	ss(socket).on('fullData', function(stream, data) {
			// un peu degueulasse, selon le temps on corrigera
			var location = null;
			if(data != null && data.location != null && data.location._doc != null){
				location = {
					 datetime: data.location._doc.datetime,
					 longitude: data.location._doc.longitude,
					 latitude: data.location._doc.latitude,
					 altitude : data.location._doc.altitude,
					 speed : data.location._doc.speed,
					 status: data.location._doc.status
				 };
			}else{
				location = {
					 datetime: null,
					 longitude: null,
					 latitude: null,
					 altitude : null,
					 speed : null,
					 status: null
				 };
			}

			var outputDirectory = process.cwd()+'/public/daily/';

			if(data.dateOfPicture != null){
				console.log("Data :",data);
				var ISOdate = data.dateOfPicture;
				console.log(ISOdate);
				var date = new Date(ISOdate);
				console.log(date);
			}
			else{
				var date = new Date.now();
			}

			folder = tools.addNotSignicativeZeros(date.getDate())+''+tools.addNotSignicativeZeros(date.getMonth()+1)+'/photos/';
			outputDirectory += folder;
			fs.existsSync(outputDirectory) || fs.mkdirSync(outputDirectory);
			
			console.log("Saving picture in directory : "+outputDirectory);
	 		
	 		var filename = outputDirectory + path.basename(data.name);

			if(data.dateOfPicture!= null){
				try{
					//SAVE Pictures
					businessImages.insertPicture(data.dateOfPicture, filename, data.typeOfPicture);
					businessLocations.insertLocation(data.dateOfPicture, location.longitude, location.latitude, location.altitude, location.speed);
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
