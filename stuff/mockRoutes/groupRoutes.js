exports = module.exports = function() { //= groupRoutes 
	var registerRoutes = function(app) {
		// Consider the in memory process to make this 'work' for real on a meta level. Routes that call the crudl functions with a few parameters.
		app.get('/group', function(req, res){
		  var body = '[{"id": 1, "name": "group 1"}, {"id": 2, "name": "group 2"}]';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.get('/group/:id', function(req, res){
		  var body = '{"id": 1, "name": "group 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.post('/group/:id', function(req, res){
		  var body = '{"id": 1, "name": "group 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.put('/group/:id', function(req, res){
		  var body = '{"id": 1, "name": "group 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.delete('/group/:id', function(req, res){
		  var body = '{"id": 1, "name": "group 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
	};

	var getRouteDisplayInformation = function()
	{
		return "The group routes for list, get, post, put and delete. They do little more than log what is there and return the same static data.";
	};

	return {
		registerRoutes: registerRoutes,
		getRouteDisplayInformation: getRouteDisplayInformation
	};
};
