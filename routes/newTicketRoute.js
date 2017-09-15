"use strict"

const Route = require('./route')
const ZendDeskController = require('../controllers/zendeskController')
const Boom = require('boom')

const internals = {}

exports = module.exports = internals.NewTicketRoute = function () {

    this.zenDeskController = new ZendDeskController()
    internals.NewTicketRoute.prototype.getHandler = internals.NewTicketRoute.prototype.getHandler.bind(this)
    return new Route("POST", "/api/tickets", this.getHandler)
}


internals.NewTicketRoute.prototype.getHandler = function (request, reply) {


    if (request.payload && request.payload.ticket) {

        return this.zenDeskController.createTicket(request.payload.ticket)
            .then((response) => { return reply({ message: "Ticket created", ticket: response.ticket }) })
            .catch((err) => { return reply(Boom.badRequest(err)) })
    }

    return reply(Boom.badRequest('Invalid requester'));


}
