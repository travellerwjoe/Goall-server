class Model {
    constructor() {

    }
    promise(fn) {
        return new Promise((resolve, reject) => {
            return fn(resolve, reject)
        })
    }
}

module.exports = Model