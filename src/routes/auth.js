const { stripPrefix } = require('../utils')

module.exports = async (fastify, options) => {

    fastify.register(require('fastify-reply-from'), {base: process.env.AUTH_API_URL})

    const forward = (req, res) => {
        res.from(stripPrefix(req.url, options.prefix))
    }

    fastify.route({
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        url: '*',
        handler: forward
    })

}
