"use strict"

const Route = require('./route')
const ZendDeskController = require('../controllers/zendeskController')
const Boom = require('boom')

const internals = {}

exports = module.exports = internals.TicketsRoute = function () {
    
    return new Route("GET", "/api/tickets/{requester*}", this.getHandler)
}


internals.TicketsRoute.prototype.getHandler = function (request, reply) {

    if (request.params.requester) {

        return new ZendDeskController().getTickets(request.params.requester)
            .then((response) => { return reply(response) })
            .catch((err) => { return reply(Boom.badRequest(err)) })
    }


    return reply(Boom.badRequest('Invalid requester'));


}
