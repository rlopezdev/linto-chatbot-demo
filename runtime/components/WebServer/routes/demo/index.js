const debug = require('debug')('linto-admin:routes/admin')

module.exports = (webServer) => {
    return [{
        path: '/meeting-room',
        method: 'get',
        controller: (req, res, next) => {
            res.setHeader("Content-Type", "text/html")
            res.sendFile(process.env.BASE_PATH + '/dist/meeting-room.html')
        }
    }, {
        path: '/coffee-machine',
        method: 'get',
        controller: (req, res, next) => {
            res.setHeader("Content-Type", "text/html")
            res.sendFile(process.env.BASE_PATH + '/dist/coffee-machine.html')
        }
    }]
}