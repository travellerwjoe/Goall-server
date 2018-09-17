const { DateTime } = require('luxon')
const loggerMiddleware = async (ctx, next) => {
    const datetime = DateTime.local().toISO()
    await next()
    console.log(`${datetime} ${ctx.method} ${ctx.url} - ${ctx.response.get('X-Response-Time')}ms`)
}

const responseTimeMiddleware = async (ctx, next) => {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    ctx.set('X-Response-Time', time)
}

module.exports = {
    loggerMiddleware,
    responseTimeMiddleware
}