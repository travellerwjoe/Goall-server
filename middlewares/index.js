const { DateTime } = require('luxon')

const errMap = {
    401: 'Unauthorized'
}

const loggerMiddleware = async (ctx, next) => {
    const datetime = DateTime.local().toISO()
    await next()
    const err = errMap[ctx.status] || ''
    console.log(`${datetime} ${ctx.method} ${ctx.url} - ${ctx.response.get('X-Response-Time')}ms ${err}`)
}

const responseTimeMiddleware = async (ctx, next) => {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    ctx.set('X-Response-Time', time)
}

const authMiddleware = async (ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = 'You have no authentication!'
        } else {
            throw err
        }
    })
}

module.exports = {
    loggerMiddleware,
    responseTimeMiddleware,
    authMiddleware
}