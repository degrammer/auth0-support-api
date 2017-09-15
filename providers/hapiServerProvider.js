'use strict'

const Hapi = require('hapi')
const Path = require('path')
let _server = null

const internalDefinition = {}

/**
 * @constructor
 * @return {HapiServerProvider}
 * 
 */

exports = module.exports = internalDefinition.HapiServerProvider = function (events) {
    this.events = events == null ? {} : events
}

internalDefinition.HapiServerProvider.prototype.addRoutes = function (routes) {
    this.routes = routes;
}

internalDefinition.HapiServerProvider.prototype.startServer = function (connection) {

    if (!_server) _server = new Hapi.Server()

    this.connection = connection
    _server.connection({ port: this.connection.config.port, host: this.connection.config.host, routes:{ cors: true} })
    _server.register(require('inert'), () => { })
    _server.start(this.events.onServerStartError)

    if (this.connection.config.handleClientSideRouting) _handleClientSideRouting(_server, this.connection.config)

    _addRoutes(_server, this.routes)

    console.log(`starting server at ${this.connection.config.host}:${this.connection.config.port}`)

}


// Private functions

function _addRoutes(server, routes) {

    if (routes && routes.length) {
        for (let index in routes) {
            console.log("Adding route", routes[index])
            server.route(routes[index])
        }

    } else {

        console.warn("Hapi: routes not found")
    }
}

function _handleClientSideRouting(server, config) {

    const staticDirectory = Path.join(__dirname, `../${config.staticFolder}`)
    const staticFile = Path.join(__dirname, `../${config.staticFolder}/${config.mainFile}`)
    console.log(`Serving static folder ${staticDirectory}, main file: ${staticFile}`)
    //Handle client side routes and static content
    server.route({
        method: 'GET', path: '/{path*}', handler: {
            directory: {
                path: staticDirectory,
                redirectToSlash: true,
                index: true
            }
        }
    })

    server.ext('onPostHandler', function (request, reply) {

        const response = request.response;
        //404 errors will be handled from the client side.
        if (response.isBoom && response.output.statusCode === 404) {
            return reply.file(staticFile)
        }

        return reply.continue()
    })
}