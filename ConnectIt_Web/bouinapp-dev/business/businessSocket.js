var express = require('express');
var mongoose = require('mongoose');
var io = require('socket.io');
var ss = require('socket.io-stream');
var fs = require('fs');
var path = require('path');
var businessImages = require('./businessImages');
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
			console.log("I receive fulldata ->",data);
			var filename = __dirname+'/output/'+Date.now()+'_'+ path.basename(data.name);
			stream.pipe(fs.createWriteStream(filename));
		});

		// Bind socket deconnection
		socket.on('disconnect', function (socket) {
			console.log('Un client est déconnecté !');
		});
	});
};

module.exports = businessSocket;