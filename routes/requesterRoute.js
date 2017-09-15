"use strict"

const Route = require('./route')
const requesters = require('../data/requesters.json')
const internals = {}

exports = module.exports = internals.TicketsRoute = function () {
    return new Route("GET", "/api/requesters", this.getHandler)
}


internals.TicketsRoute.prototype.getHandler = function (request, reply) {

    return reply(requesters)
}
