const Koa = require('koa')
const compose = require('koa-compose')
const jwt = require('koa-jwt')
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const config = require('./config')
const router = require('./routes')
const {
    loggerMiddleware,
    responseTimeMiddleware,
    authMiddleware,
} = require('./middlewares')

const app = new Koa()

const middlewares = compose([loggerMiddleware, responseTimeMiddleware, authMiddleware])

app.use(middlewares)

app.use(cors())

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(jwt({ secret: config.secret }).unless({
    path: [
        //todo: will be changed later
        /\/auth\/.*/,
    ],
}))

app.use(router.routes(), router.allowedMethods())

app.use(async ctx => {
    ctx.body = 'You are visiting Goall API service.'
})

app.listen(config.port || process.env.port, () => {
    console.log(`Goall sever is running on port ${config.port}.`)
})

app.on('error', err => {
    console.error('Goall server error:', err)
})