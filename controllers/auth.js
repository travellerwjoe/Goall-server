const jwt = require('jsonwebtoken')
const { secret } = require('../config')
class AuthController {
    constructor() {

    }

    //TODO: will be changed later
    async login(ctx, next) {
        console.log(ctx)
        const { user, pass } = ctx.request.body
        const payload = {
            user
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        ctx.body = 'login'
        ctx.body = token
    }
}

module.exports = AuthController