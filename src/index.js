require('dotenv').config()

const fastify = require('fastify')({logger: true})

const basePrefix = '/api/v1'

fastify.register(require('fastify-cors'),  {origin: '*'})

fastify.register(require('./routes/auth'), {prefix: basePrefix + '/auth'})
fastify.register(require('./routes/data'), {prefix: basePrefix + '/data'})

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
