const chalk = require('chalk')

const consoleMap = new Map()
    .set('error', 'red')
    .set('info', 'cyan')
    .set('success', 'green')

for (const [method, color] of consoleMap.entries()) {
    console[method] = function () {
        const args = Array.from(arguments).map(arg => {
            return chalk[color](typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)
        })
        console.log.apply(console, args)
    }
}