class Controller {
    constructor() {

    }

    static response(target, propName, descriptor) {
        const value = descriptor.value
        descriptor.value = async (...args) => {
            const [ctx] = args
            try {
                const res = await value.apply(target, args)
                return target.json.apply(target, [ctx, res])
            } catch (err) {
                let msg
                if (err instanceof Error) {
                    console.error('error:', err.message)
                    msg = err.message
                } else {
                    msg = err
                }
                target.throw.apply(target, [ctx, msg])
            }
        }
        return descriptor
    }

    json(ctx, body) {
        ctx.body = {
            code: 1,
            body
        }
    }

    throw(ctx, message = 'Server Error') {
        ctx.body = {
            code: 0,
            message
        }
    }
}

module.exports = Controller