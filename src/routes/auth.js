const AuthController = require('../controllers/auth')
const auth = new AuthController()

const authRouter = (router) => {
    router.post('/auth/login', auth.login.bind(auth))
    router.post('/auth/register', auth.register.bind(auth))
}

module.exports = authRouter