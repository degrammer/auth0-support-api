'use strict'

/**
 * AuthO Customer Success API
 * @author  Ruben Restrepo <rubenchorestrepo@gmail.com>
 */

const ServerManager = require('./providers/serverManager')
const HapiServerProvider = require('./providers/hapiServerProvider')
const ServerConnection = require('./providers/serverConnection')
const TicketsRoute = require('./routes/ticketsRoute')
const NewTicketRoute = require('./routes/newTicketRoute')
const RequesterRoute = require('./routes/requesterRoute')
const config = require('./config')


const applicationDefinition = {}

/**
 * @constructor
 * @return {Application}
 * 
 */
exports = module.exports = applicationDefinition.Application = function () {

    this.hapiServerProvider = new HapiServerProvider()
    this.serverConnection = new ServerConnection(config.connection)

    return this
}

/**
 * Start the web server, you must specify a hapiServerProvider and a serverConnection
 */
applicationDefinition.Application.prototype.start = function () {

    this.serverManager = new ServerManager(this.hapiServerProvider,
        [new TicketsRoute(),
        new RequesterRoute(),
        new NewTicketRoute()])
        
    this.serverManager.startServer(this.serverConnection)
}


