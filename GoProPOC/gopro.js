var Camera = require('gopro').Camera;
var camera = new Camera('10.5.5.9', 'Bouineur3.0');
var when = require('when');
var fsPath = require('path');
var fs = require('fs');


function sleep(ms) {
	var dfd = when.defer()
	setTimeout(dfd.resolve.bind(dfd), ms)
	return dfd.promise
}

function snap() {
	return camera.startCapture()
	.then(function() {
		return sleep(10000)
	})
	.then(function() {
		return camera.stopCapture()
	})
}

function getImage(fromPath, toPath) {
  toPath = 'output/'+toPath;
	console.log('retrieving image',fromPath, toPath)
	return camera.get(fromPath)
	.then(function(stream) {
		var dfd = when.defer()
		var out = fs.createWriteStream(toPath)
		out.on('error', dfd.reject.bind(dfd))
		out.on('end', function() {
			console.log('end')
		})
		out.on('close', function() {
			console.log('close')
		})
		out.on('finish', function() {
			console.log('done retrieving image',fromPath, toPath)
			dfd.resolve()
		})
		stream.pipe(out)
		stream.on('error', dfd.reject.bind(dfd))
		return dfd.promise
	})
}

function mirror(fromPath, toPath) {
	return camera.ls(fromPath).then(function(paths) {
		return when.map(paths, function(path) {
			var src = fsPath.join(fromPath, path.name)
			var dest = fsPath.join(toPath, path.name)
			if (path.isFolder)
				return mirror(src, dest)

			return getImage(src, new Date().getTime()+'.jpg')
		})
	})
}

function snapGetAndDelete() {
	return snap()
	.then(function() {
		return mirror('/videos/DCIM/100GOPRO', process.cwd())
	})
	.then(function() {
		return camera.deleteLast()
	})
}

var interval = 60000

function loop() {
	var tstart = Date.now()

	snapGetAndDelete()
		.then(function() {
			var tend = Date.now()
			var tleft = interval - (tend-tstart)
			console.log('tleft', tleft)
			setTimeout(loop, tleft)
		})
		.otherwise(function(e) {
			clearInterval(interval)
			console.error(e.stack || e)
			throw e
		})
}

loop();
