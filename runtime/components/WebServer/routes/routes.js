const debug = require('debug')('app:webserver:routes')

module.exports = (webServer) => {
    return {
        "/": require('./homepage')(webServer),
        "/demo": require('./demo')(webServer)
    }
}