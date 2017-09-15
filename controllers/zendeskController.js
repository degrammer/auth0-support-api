"use strict"
const Zendesk = require('zendesk-node-api')
const ZendeskConfig = require('../config').zendesk
const Request = require('request')
const ZendeskExtensions = require('../zendesk-api-extensions/zendeskExtensions')
const TicketRequester = require('../zendesk-api-extensions/ticketRequester')


const internals = {}

exports = module.exports = internals.ZendeskController = function () {
    this.zendesk = new ZendeskExtensions({

        url: ZendeskConfig.url,
        token: ZendeskConfig.token,
        email: ZendeskConfig.email
    })

    return this
}



internals.ZendeskController.prototype.createTicket = function (ticket) {

    return this.zendesk.createTicket(ticket.subject,
        ticket.body,
        new TicketRequester(ticket.name, ticket.email),
        ticket.ticketPriority,
        this.zendesk.TicketStatus.NEW,
        ticket.collaborators)
}

/** 
@returns {Promise}
Returns a promise with the tickets
*/
internals.ZendeskController.prototype.getTickets = function (requesterEmail) {

    return this.zendesk.searchTickets(requesterEmail)

}


