const mongoose = require('mongoose')
const Model = require('./index')
const userSchema = require('../schemas/user')


const User = mongoose.model('User', userSchema)

class UserModel extends Model {
    constructor() {
        super()
    }
    async register(data) {
        const user = new User(data)
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