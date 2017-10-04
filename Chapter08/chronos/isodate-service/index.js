const Hapi = require('hapi')
const server = new Hapi.Server()
const moment = require('moment')

server.connection({port: 3000})

server.route({
  method: 'GET',
  path: '/isodate/{timestamp}',
  handler: (request, reply) => {
    reply({date: moment.unix(request.params.timestamp).toISOString()})
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('isodate-service started on port 3000')
})
