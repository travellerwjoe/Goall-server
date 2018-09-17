const logger = require('koa-logger')
const { DateTime } = require('luxon')
const chalk = require('chalk')

const errMap = {
    200: 'OK',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
}

const colorMap = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow'
}
// const loggerMiddleware = async (ctx, next) => {
//     const datetime = DateTime.local().toISO()
//     await next()
//     const err = errMap[ctx.status] || ''
//     console.log(`${datetime} ${ctx.method} ${ctx.url} - ${ctx.response.get('X-Response-Time')}ms ${err}`)
// }

const loggerMiddleware = logger((str, args) => {
    const datetime = DateTime.local().toISO()
    const status = args[3]
    const s = status / 100 | 0
    const color = colorMap.hasOwnProperty(s) ? colorMap[s] : 0
    const err = errMap[status] ? `  ${chalk[color](errMap[status])}` : ''
    str = `${str}${err}  ---  ${datetime}`
    console.log(str)
})

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