const TransportServer = require('./transportServer');

const server = new TransportServer();

server.initialize(8080, {
    perMessageDeflate: false,
});