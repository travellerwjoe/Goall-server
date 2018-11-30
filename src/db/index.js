const mongoose = require('mongoose')
const { db: { host, port, dbName, user, pass } } = require('../../config')

const db = mongoose.connection
const uri = `mongodb://${host}:${port}/${dbName}?authSource=admin`

console.log(`connecting mongo uri ${uri}`)

mongoose.connect(uri, {
    user,
    pass,
    useNewUrlParser: true,
})

mongoose.set('useCreateIndex', true)

db.once('open', () => {
    console.log('MongoDB is being connected.')
})

db.on('error', console.error.bind(console, 'MongoDB error:'))
