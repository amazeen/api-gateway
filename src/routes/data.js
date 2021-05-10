const { stripPrefix, verifyJwt, getJwtData, protectedRouteValidator } = require('../utils')

module.exports = async (fastify, options) => {
    
    fastify.register(require('fastify-reply-from'), {base: process.env.DATA_API_URL})
    
    fastify.addHook('preValidation', async (req, res) => {
        
        try{
            const result = await verifyJwt(req.headers.authorization)
        }
        catch(err){
            res.status(401).send()
        }
    })
            
    const forward = (req, res) => {
        
        try{
            const permissions = getJwtData(req.headers.authorization).permissions
            const permissionsStr = permissions.join(',')

            res.from(stripPrefix(req.url, options.prefix), {
                rewriteRequestHeaders: (_, headers) => {return {...headers, 'x-auth-permissions': permissionsStr}}
            })
        }
        catch(err){
            console.log(err)
            res.status(400).send()
        }        
    }

    fastify.get ('/',                                 protectedRouteValidator, forward)
    fastify.get ('/area/:area',                       protectedRouteValidator, forward)
    fastify.get ('/area/:area/silo/:silo',            protectedRouteValidator, forward)
    fastify.get ('/area/:area/silo/:silo/history',    protectedRouteValidator, forward)
    fastify.get ('/area/:area/silo/:silo/parameters', protectedRouteValidator, forward)
    fastify.post('/area/:area/silo/:silo/parameters', protectedRouteValidator, forward)
    fastify.get ('/area/:area/silo/:silo/thresholds', protectedRouteValidator, forward)
    fastify.put ('/area/:area/silo/:silo/thresholds', protectedRouteValidator, forward)
        
}
