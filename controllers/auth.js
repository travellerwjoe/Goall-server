const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const UserModel = require('../db/model/user')
const Controller = require('./index')
const user = new UserModel()

class AuthController extends Controller {
    constructor() {
        super()
    }

    //TODO: will be changed later
    async login(ctx) {
        const { user, pass } = ctx.request.body
        const payload = {
            user
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        this.json(ctx, token)
    }

    async register(ctx) {
        const payload = ctx.request.body
        try {
            const res = await user.register(payload)
            ctx.body = res
            this.json(ctx, res)
        } catch (err) {
            this.throw(ctx, err)
        }
    }
}

module.exports = AuthController