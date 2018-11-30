const process = require('process')

module.exports = {
    port: process.env.GOALL_SERVER_PORT || 8000,
    secret: 'Goall server',
    db: {
        host: process.env.GOALL_DB_HOST || '127.0.0.1',
        port: process.env.GOALL_DB_PORT || '27017',
        dbName: process.env.GOALL_DB_NAME || 'Goall',
        user: process.env.GOALL_DB_USER || 'root',
        pass: process.env.GOALL_DB_PASS || '123456'
    }
}