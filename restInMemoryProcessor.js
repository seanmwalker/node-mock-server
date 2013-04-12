// module.exports.restInMemoryProcessor = 
exports = module.exports =function() { 

	var initializeCrudlRoutes =  function(app, listUrl, getUrl, postUrl, postPropertyToAutoIncrement, putUrl, deleteUrl, jsonDataList) {
		var __ = require("underscore"),
			autoIncrementKey = postPropertyToAutoIncrement,
			data = jsonDataList || [];

		var getItemFromCache = function(filter) {
			return __.findWhere(data, filter);
		};

		var getKeysFromUrl = function(req) {
			var filter = {};
			for (key in req.params) {
				if (key===autoIncrementKey)
				{
					filter[key] = parseInt(req.params[key]);
				}
				else
				{
					filter[key] = req.params[key];
				}
			}

			console.log("filter = " + JSON.stringify(filter));

			// Need to make the object into JSON
			return JSON.parse(JSON.stringify(filter));
		};

		// Register List endpoint
		if (listUrl) {
			app.get(listUrl, function(req, res){
				var body = JSON.stringify(data) || "{}";
				res.setHeader('Content-Type', 'application/json');
				res.setHeader('Content-Length', body.length);
				res.end(body);
			});
		}

		// Get an item
		if (getUrl) {
			app.get(getUrl, function(req, res){
				var item =  getItemFromCache(getKeysFromUrl(req));
				if (item) {
					var body =  JSON.stringify(item) || "{}";
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.end(body);
				}
				else {
					var body =  '{"error": "No item found with the required parameters. ' + req.params + '"}';
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.status(404);
					res.end(body);
				}
			});
		}

		// Create an item
		if (postUrl) {
			app.post(postUrl, function(req, res){
				var val = req.body[autoIncrementKey] ? req.body[autoIncrementKey] : 0;
				var filter = __.extend(req.params, { autoIncrementKey: val });
				var item =  getItemFromCache(getKeysFromUrl(filter));
				if (item) {
					var body = '{ "error": "Duplicate value found" }';
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.status(409);
					res.end(body);
				}
				else {
					var newId =  __.max(data, function(dataItem) { 
						return ((dataItem && dataItem[autoIncrementKey]) ? dataItem[autoIncrementKey] + 1 : null ) || 1;
					});

					if (newId > 999999999 || newId < 1) {
						newId = 1;
					}

					item = req.body;
					item[postPropertyToAutoIncrement] = newId;
					data.push(item);

					var body =  JSON.stringify(item) || "{}";
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.status(201);
					res.end(body);
				}
			});
		}

		// Update an item
		if (putUrl) {
			app.put(putUrl, function(req, res){
				var item =  getItemFromCache(getKeysFromUrl(req));
				if (item) {
					__.extend(item, JSON.parse(JSON.stringify(req.body)));
					var body = JSON.stringify(item) || "{}";
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.end(body);
				}
				else {
					var body =  '{"error": "No item found with the required parameters. ' + req.params + '"}';
					res.setHeader('Content-Type', 'application/json');
					res.setHeader('Content-Length', body.length);
					res.status(404);
					res.end(body);
				}
			});
		}

		if (deleteUrl) {
			app.delete(deleteUrl, function(req, res){
				var item = getItemFromCache(getKeysFromUrl(req));
				if (item) {
					data = __.reject(data, function(dataItem){ return dataItem === item; });
				}
				var body = '';
				res.setHeader('Content-Type', 'application/json');
				res.setHeader('Content-Length', body.length);
				res.status(204);
				res.end(body);
			});
		}
	};

	return { initializeCrudlRoutes: initializeCrudlRoutes };
};