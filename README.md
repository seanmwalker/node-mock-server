node-mock-server

================


A Node Mock Server that supports serving static files. It also has a plugin to handle in memory CRUDL REST actions. There are a few sample rest include files that demonstrate the basic approach to integrating your needed endpoints into this server.

Example Urls that work in the checked in code:

 - http://localhost:3000/d3.html "GET" is a simple D3.js svg graph... Just there to show how we can load static content. there is a commented line in the server.js that shows how to enable static content outside of the web root directory as well.

 - http://localhost:3000/managerMonkey "GET" will get an empty list until you post something there. Use 'id' as your primary key when you 'put' an update. The rest of the fields are up to you.
