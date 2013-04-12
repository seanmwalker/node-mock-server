/*
First make this file: package.json

{
  "name": "Node-Mock-Server",
  "description": "A mock http server for testing your client side code via the node.js express serving up static content and registering your custom/mocked routes.",
  "version": "0.0.2",
  "private": true,
  "dependencies": {
    "express": "3.1.1",
    "walkdir": "0.0.5"
    "underscore": "1.4.4"
  }
}

Then install the app using 
npm install
npm install underscore
npm install walkdir
*/ 

var express = require('express'),
	app = express(),
	walk = require('walkdir'),
	__ = require("underscore"),
	status = "starting",
	pathEndingToMatch = "/mockRoutes",
	paths = walk.sync('.');

app.use(express.cookieParser());
app.use(express.bodyParser());
app.basedir = __dirname;
// Lets hold on to all of the instances of our route code. 
module.exports.customRoutes = [];

app.status = "configuring custom routes";
console.log("status: " + app.status);

var currentIncludePath = "";
__.each(paths, function (path) {
	var pathEndingPart = (path.length >= pathEndingToMatch.length ? path.substring(path.length - pathEndingToMatch.length) : "-./");
	var currentPathStartingPart = (currentIncludePath.length > 0 ? path.substring(0, currentIncludePath.length) : "-./");


	if (pathEndingPart === pathEndingToMatch) {
		currentIncludePath = path;
	}
	else if (currentPathStartingPart === currentIncludePath) {
		var newRoutes = require(path)();
		exports.customRoutes.push(newRoutes);
		newRoutes.registerRoutes(app);
	}
});

app.status = "configuring default routes";
console.log("status: " + app.status);

// Default routes that are always here
app.get('/status', function(req, res){
  var body = "<html><head><title>Node Mock Server Status</title></head><body><h1>Node Mock Server Status: " + app.status + "</h1><h3>Loaded Routes:</h3><ul>";
  __.each(module.exports.customRoutes, function(route) {
  	body += "<li>" + route.getRouteDisplayInformation() + "</li>";
  });
  body += "</ul></body></html>";

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

// Serve our static content from the public folder.
app.status = "configuring static content";
console.log("status: " + app.status);
app.use(express.static(__dirname + '/public'));
// We can use directories outside of our web root.
// app.use(express.static('../publicStuff'));


app.listen(3000);
console.log('Node Mock Server now listening on port 3000');
app.status = "running";