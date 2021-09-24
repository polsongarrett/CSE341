const http = require('http'); // imported for creating a server
const routes = require('./prove01-routes');  

const server = http.createServer(routes);

server.listen(3000);
