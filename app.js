const Koa = require('koa')
const compose = require('koa-compose')
const jwt = require('koa-jwt')
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const R = require('ramda')
const config = require('./config')
const router = require('./routes')
const {
    loggerMiddleware,
    responseTimeMiddleware,
    authMiddleware,
} = require('./middlewares')
const apolloServer = require('./apollo')
require('./db')
require('./tools/common')

const app = new Koa()
app.context.isDev = process.env.NODE_ENV === 'development'

const middlewares = compose([loggerMiddleware, responseTimeMiddleware, authMiddleware])

app.use(middlewares)

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

const allowedOperations = ['IntrospectionQuery', 'login', 'register']

app.use(jwt({ secret: config.secret }).unless({
    path: [
        //todo: will be changed later
        /\/auth\/.*/,
    ],
    custom: ctx => {
        const { operationName } = ctx.request.body
        const { url, method, body } = ctx.request
        const urlIsGraphql = url === '/graphql'
        console.log(ctx.isDev && method === 'GET' && R.isEmpty(body) && R.isNil(operationName))
        if (!urlIsGraphql) {
            return false
        }

        if (operationName && allowedOperations.includes(operationName)) {
            return true
        }

        if (ctx.isDev && method === 'GET' && R.isEmpty(body) && R.isNil(operationName)) {
            return true
        }

        return false
    }
}))

app.use(cors())

apolloServer.applyMiddleware({ app })

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