const mongoose = require('mongoose')
const Model = require('./index')
const userSchema = require('../schemas/user')


const User = mongoose.model('User', userSchema)

class UserModel extends Model {
    constructor() {
        super()
    }
    async login({ username, password }) {
        return User.findOne({ username, password })
    }
    async register(payload) {
        const user = new User(payload)
        const error = user.validateSync()
        return await user.save()
        // return this.promise((resolve, reject) => {
        //     return user.save()
        //         .then(res => {
        //             console.log('save res', res)
        //             resolve(res)
        //         })
        //         .catch(err => {
        //             console.error('save error', err)
        //             resolve(err)
        //         })
        // })

        // console.log('model', res)
        // return res
    }
}


module.exports = UserModel