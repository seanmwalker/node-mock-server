exports = module.exports = function() {
	var __ = require("underscore");

	var registerRoutes = function(app) {
		var rimp = require("../../../restInMemoryProcessor")();
		rimp.initializeCrudlRoutes(app, "/codeMonkey", "/codeMonkey/:id", "/codeMonkey", "id", "/codeMonkey/:id", "/codeMonkey/:id", null);
		rimp.initializeCrudlRoutes(app, "/qaMonkey", "/qaMonkey/:id", "/qaMonkey", "id", "/qaMonkey/:id", "/qaMonkey/:id", null);
		rimp.initializeCrudlRoutes(app, "/managerMonkey", "/managerMonkey/:id", "/managerMonkey", "id", "/managerMonkey/:id", "/managerMonkey/:id", null);
		rimp.initializeCrudlRoutes(app, "/ownerMonkey", "/ownerMonkey/:id", "/ownerMonkey", "id", "/ownerMonkey/:id", "/ownerMonkey/:id", null);
	};

	var getRouteDisplayInformation = function()
	{
		return "<div>The routes for list, get, post, put and delete.</div>" + 
				"<div>Code Monkey Routes: /codeMonkey</div>" + 
				"<div>Q.A. Monkey Routes: /qaMonkey</div>" + 
				"<div>Manager Monkey Routes: /managerMonkey</div>" + 
				"<div>Owner Monkey Routes: /ownerMonkey</div>";
	};

	return {
		registerRoutes: registerRoutes,
		getRouteDisplayInformation: getRouteDisplayInformation
	};
};