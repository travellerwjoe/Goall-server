const Koa = require('koa')
const compose = require('koa-compose')
const config = require('./config')
const { loggerMiddleware, responseTimeMiddleware } = require('./middlewares')

const app = new Koa()

const middlewares = compose([loggerMiddleware, responseTimeMiddleware])

app.use(middlewares)

app.use(async ctx => {
    console.log(ctx.response)
    ctx.body = 'You are visiting Goall API service.'
})

app.listen(config.port || process.env.port, () => {
    console.log(`Goall sever is running on port ${config.port}.`)
})

app.on('error', err => {
    console.error('Goall server error:', err)
})