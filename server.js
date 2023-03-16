'use strict';

const Hapi = require('@hapi/hapi');
const handler = require('./handler');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
  });

  // Read all contacts
  server.route({
    method: 'GET',
    path: '/contacts',
    handler: handler.readContactHandler,
  });

  // Delete contacts
  server.route({
    method: 'DELETE',
    path: '/contacts/{contact_id}',
    handler: handler.deleteContactHandler,
  });

  // Create contacts
  server.route({
    method: 'POST',
    path: '/contacts',
    handler: handler.createContactHandler,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
