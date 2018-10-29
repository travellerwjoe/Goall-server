const Router = require('koa-router')
const router = new Router()
require('./auth')(router)


module.exports = router