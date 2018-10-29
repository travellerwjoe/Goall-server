const mongoose = require('mongoose')
const { db: { host, port, dbName, user, pass } } = require('../../config')

const db = mongoose.connection
const uri = `mongodb://${host}:${port}/${dbName}`

mongoose.connect(uri, {
    user,
    pass,
    useNewUrlParser: true,
}).then(() => {
    console.log('Goall server has connected with MongoDB.')
}).catch(err => {
    console.error('MongoDB connection error:' + err)
})
mongoose.set('useCreateIndex', true)

db.once('open', () => {
    console.log('MongoDB is being connected.')
})

db.on('error', console.error.bind(console, 'MongoDB error:'))
