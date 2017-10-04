const Hapi = require('hapi')
const server = new Hapi.Server()
let request = require('request')

server.connection({port: 8080})

server.route({
  method: 'GET',
  path: '/dates/{timestamp}',
  handler: (req, reply) => {
    const utcEndpoint = `http://utcdate-service:3001/utcdate/${req.params.timestamp}`
    const isoEndpoint = `http://isodate-service:3000/isodate/${req.params.timestamp}`
    request(utcEndpoint, (err, response, utcBody) => {
      if (err) {
        console.log(err)
        return
      }
      request(isoEndpoint, (err, response, isoBody) => {
        if (err) {
          console.log(err)
          return
        }
        reply({
          utcDate: JSON.parse(utcBody).date,
          isoDate: JSON.parse(isoBody).date,
          version: "2.0"
        })
      })
    })
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('aggregator started on port 8080')
})
