const { stripPrefix, verifyJwt, getJwtData, protectedRouteValidator } = require('../utils')

module.exports = async (fastify, options) => {
    
    fastify.register(require('fastify-reply-from'), {base: process.env.REALTIME_API_URL})
    
    // fastify.addHook('preValidation', async (req, res) => {
        
    //     try{
    //         const result = await verifyJwt(req.headers.authorization)
    //     }
    //     catch(err){
    //         res.status(401).send()
    //     }
    // })
            
    const forward = (req, res) => {
        // try{
        //     const permissions = getJwtData(req.headers.authorization).permissions
        //     if(!permissions.includes('read')) return res.status(403).send()

            res.from(stripPrefix(req.url, options.prefix))     
        // }
        // catch(err){
        //     console.log(err)
        //     res.status(400).send()
        // }
    }

    fastify.route({
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        url: '*',
        handler: forward,
        //schema: protectedRouteValidator
    })     
}
