var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');
var ss = require('socket.io-stream');
var fs = require('fs');
var path = require('path');
var businessImages = require('./businessImages');
var businessLocations = require('./businessLocations');
var tools = require("../tools/tools");
var log = require("../tools/logger");

var businessSocket = {};

businessSocket.init = function(server){
	// Attach socket on server listen
	io = io.listen(server);

	// Start binding connection event
	io.sockets.on('connection', function (socket) {

	log.info('Un client vient de se connecter ! ');

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
				var ISOdate = data.dateOfPicture;
				var date = new Date(ISOdate);
			}
			else{
				var date = new Date.now();
				log.info("Oooh... On a pas reussi à lire la date de l'image. Sauvegarde dans les photos du jour.");
			}

			folder = tools.addNotSignicativeZeros(date.getDate())+''+tools.addNotSignicativeZeros(date.getMonth()+1)+'/photos/';
			outputDirectory += folder;
			
			log.info("Sauvegarde de l'image dans le dossier : "+outputDirectory);
	 		
	 		var filename = outputDirectory + path.basename(data.name);
			log.info("Nom fichier complet : "+filename);

			if(data.dateOfPicture!= null){
				try{
					//SAVE Pictures
					businessImages.insertPicture(data.dateOfPicture, filename, data.typeOfPicture);
					businessLocations.insertLocation(data.dateOfPicture, location.longitude, location.latitude, location.altitude, location.speed);
					log.info("Sauvegarde image + localisation OK !");
				}catch(e){
					var datetime = Date.now();
					//SAVE Pictures
					businessImages.insertPicture(datetime, filename, 'normal');
					businessLocations.insertLocation(datetime, location.longitude, location.latitude, location.altitude, location.speed);
					log.info("Sauvegarde image + localisation OK ... mais sans type de photo (normal/heart)!");
				}
			}
	 		stream.pipe(fs.createWriteStream(filename));
	 	});

	 	// Bind socket deconnection
	 	socket.on('disconnect', function (socket) {
	 		console.log('Un client vient de se déconnecter !');
	 	});
	 });
};

module.exports = businessSocket;
