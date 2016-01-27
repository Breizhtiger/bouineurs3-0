var Camera = require('gopro').Camera;
var when = require('when');
var fsPath = require('path');
var fs = require('fs');
var goproBusiness = {};
exports.goproBusiness = goproBusiness;

var goProPicturesFolder = '/videos/DCIM/100GOPRO';

goproBusiness.cleanGoPro = function(ip,password){
  console.log("Try to clean the gopro ...");
  var camera = new Camera(ip,password)
  return camera.erase()
  .then(function() {
  	console.log('Camera erased successfully');
    return true;
  })
  .otherwise(function(e) {
  	console.error(e.stack || e);
    return false;
  });
}


goproBusiness.GetNbEltOnFolder = function(ip,password,folder){
      var camera = new Camera(ip, password);

      try{
        return camera.ls(folder).then(function(value){

          var length = value.length;
          if(length != null){
              return value.length;
          }else{
            return -1;
          }
        }).otherwise(function(e) {
        	console.error(e.stack || e)
        });
      }catch(Exception){
        console.log("error", exception);
      }

};
/**
* Start a new GoPro Collect
* Shoot, Take, launch CAllback and Delete the picture
*/
goproBusiness.startNewCollect = function(ip, password, callback){
    "user strict";
    var camera = new Camera(ip, password);

    return snapGetAndDelete();


    function sleep(ms) {
    	var dfd = when.defer()
    	setTimeout(dfd.resolve.bind(dfd), ms)
    	return dfd.promise
    }

    function snap() {
    	return camera.startCapture()
    	.then(function() {
    		return sleep(5000);
    	})
    	.then(function() {
    		return camera.stopCapture()
    	})
    }

    function getImage(fromPath, toPath) {
      toPath = process.cwd()+'/output/'+toPath;
    	console.log('retrieving image',fromPath, toPath)
    	return camera.get(fromPath)
    	.then(function(stream) {
    		var dfd = when.defer()
    		var out = fs.createWriteStream(toPath)
    		out.on('error', dfd.reject.bind(dfd))
    		out.on('end', function() {
    			console.log('end');

    		})
    		out.on('close', function() {
    			console.log('close')
    		})
    		out.on('finish', function() {
    			console.log('done retrieving image',fromPath, toPath);
          callback(toPath);
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
    		return mirror(goProPicturesFolder, process.cwd())
    	})
    	.then(function() {
    		return camera.deleteLast()
    	})
    };
}

goproBusiness.takePremiumPicture = function(){


}
