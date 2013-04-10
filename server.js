/*
First make this file: package.json

Use: npm info express version to get the most recent version of express and replace the one below here.

{
  "name": "app name",
  "description": "app description",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "3.1.1"
  }
}

Then install the app using 
npm install

npm install walkdir
*/ 

var express = require('express'),
	app = express(),
	walk = require('walkdir'),
	__ = require("underscore"),
	status = "starting",
	pathEndingToMatch = "/mockRoutes";

// Used by the helper function, and can be used by anyone else with custom functions as well.
app.__ = __;
app.inMemoryJsonDataCache = [];

var paths = walk.sync('.');

module.exports.customRoutes = [];

status = "configuring static content";


status = "configuring custom routes";

var currentIncludePath = "";
__.each(paths, function (path) {
	var pathEndingPart = (path.length >= pathEndingToMatch.length ? path.substring(path.length - pathEndingToMatch.length) : "-./");
	var currentPathStartingPart = (currentIncludePath.length > 0 ? path.substring(0, currentIncludePath.length) : "-./");

	//console.log("Path to check: " + path + " pathEndingPart: " + pathEndingPart + " currentPathStartingPart:" + currentPathStartingPart);

	if (pathEndingPart === pathEndingToMatch) {
		currentIncludePath = path;
		console.log("Found path: " + path);
	}
	else if (currentPathStartingPart === currentIncludePath) {
		// All of these route functions need to do the following at the end of their file/function definition: module.exports.customRoutes.push(newRouteFunction());
		var newRoutes = require(path)();
		module.exports.customRoutes.push(newRoutes);
		newRoutes.registerRoutes(app);
		console.log("Register routes: " + newRoutes.getRouteDisplayInformation());
	}
});

status = "configuring default routes";

// Default routes that are always here
app.get('/status', function(req, res){
  var body = "<html><head><title>Node Mock Server Status</title></head><body><h1>Node Mock Server Status: " + status + "</h1><h3>Loaded Routes:</h3><ul>";
  __.each(module.exports.customRoutes, function(route) {
  	body += "<li>" + route.getRouteDisplayInformation() + "</li>";
  });
  body += "</ul></body></html>";

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

// Serve our static content from the public folder.
app.use(express.static(__dirname + '/public'));

//registerRoutes
//getRouteDisplayInformation

app.listen(3000);
console.log('Node Mock Server now listening on port 3000');
status = "running";