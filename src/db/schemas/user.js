const mongoose = require('mongoose')
const { Schema } = mongoose
const { DateTime } = require('luxon')

const sexMap = new Map()
    .set(1, '男')
    .set(2, '女')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        // index: true,
        unique: true,
        maxlength: 30
    },
    password: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        maxlength: 50
    },
    phone: {
        type: String,
        maxlength: 20
    },
    nickname: {
        type: String,
        maxlength: 30
    },
    registerTime: Date,
    lastLoginTime: Date,
    avatar: String,
    sex: {
        type: Number,
        enum: [1, 2],
        default: 1,
        get: (v) => sexMap.get(v)
    }
})

userSchema.virtual('lastLoginTimeFormat').get(function () {
    return this.lastLoginTime && DateTime.fromMillis(this.lastLoginTime).toFormat('yyyy-MM-dd HH:mm:ss')
})

userSchema.path('username').validate(function (value) {
    return new Promise((resolve, reject) => {
        this.model('User').countDocuments({ username: value }, function (err, count) {
            if (err) {
                reject(err)
            }
            resolve(!count)
        })
    })

}, 'username `{VALUE}` already exists')

module.exports = userSchema