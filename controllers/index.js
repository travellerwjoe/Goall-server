class Controller {
    constructor() {

    }

    json(ctx, body) {
        ctx.body = {
            code: 1,
            body
        }
    }

    throw(ctx, message) {
        ctx.body = {
            code: 0,
            message
        }
    }
}

module.exports = Controller