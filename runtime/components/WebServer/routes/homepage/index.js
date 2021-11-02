const debug = require('debug')('linto-admin:routes/admin')

module.exports = (webServer) => {
    return [{
        path: '/',
        method: 'get',
        controller: (req, res, next) => {
            res.setHeader("Content-Type", "text/html")
            res.sendFile(process.env.BASE_PATH + '/dist/index.html')
        }
    }]
}