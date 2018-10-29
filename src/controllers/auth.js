const jwt = require('jsonwebtoken')
const { secret } = require('../../config')
const UserModel = require('../db/model/user')
const Controller = require('./index')
const user = new UserModel()

function c(target, propName, descriptor) {
    console.log(target, propName, descriptor)
    const value = descriptor.value
    descriptor.value = async (...args) => {
        try {
            // console.log(arguments)
            console.log('ctx', arguments)
            console.log(this)
            return await value.apply(target, args)
        } catch (err) {
            // this.throw(err)
            console.error('err', err)
        }
    }
    return descriptor
}

class AuthController extends Controller {
    constructor() {
        super()
    }

    //TODO: will be changed later
    @Controller.response
    async login(ctx) {
        // const xxx = ee
        const payload = ctx.request.body
        const res = await user.login(payload)
        if (res) {
            const token = jwt.sign(payload, secret, { expiresIn: '1h' })
            return {
                token,
                username: res.username
            }
        } else {
            throw new Error('login failed: wrong username or password')
        }
    }

    async register(ctx) {
        const payload = ctx.request.body
        try {
            const err = res
            const res = await user.register(payload)
            ctx.body = res
            this.json(ctx, res)
        } catch (err) {
            this.throw(ctx, err)
        }
    }
}

module.exports = AuthController