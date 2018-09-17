const Router = require('koa-router')
const AuthController = require('../controllers/auth')

const router = new Router()
const auth = new AuthController()

router.get('/auth/login', auth.login)

module.exports = router