function userRoutes()
{
	var registerRoutes = function(app) {
		// Consider the in memory process to make this 'work' for real on a meta level. Routes that call the crudl functions with a few parameters.
		app.get('/user', function(req, res){
		  var body = '[{"id": 1, "name": "user 1"}, {"id": 2, "name": "user 2"}]';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.get('/user/:id', function(req, res){
		  var body = '{"id": 1, "name": "user 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.post('/user/:id', function(req, res){
		  var body = '{"id": 1, "name": "user 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.put('/user/:id', function(req, res){
		  var body = '{"id": 1, "name": "user 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
		app.delete('/user/:id', function(req, res){
		  var body = '{"id": 1, "name": "user 1"}';
		  res.setHeader('Content-Type', 'application/json');
		  res.setHeader('Content-Length', body.length);
		  res.end(body);
		});
	};

	var getRouteDisplayInformation = function()
	{
		return "The user routes for list, get, post, put and delete. They do little more than log what is there and return the same static data.";
	};

	return {
		registerRoutes: registerRoutes,
		getRouteDisplayInformation: getRouteDisplayInformation
	};
};

module.exports = userRoutes;