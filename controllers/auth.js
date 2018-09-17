
class AuthController {
    constructor() {

    }

    async login(ctx, next) {
        // const { user, pass } = ctx.request.body
        
        ctx.body = 'login'
    }
}

module.exports = AuthController