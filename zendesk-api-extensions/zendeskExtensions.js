"use strict"

const ZendeskConfig = require('../config').zendesk
const RequestPromise = require('request-promise-native');

const internals = {}

exports = module.exports = internals.ZendeskExtensions = function (url, token, email) {

    return this
}


internals.ZendeskExtensions.prototype.TicketPriority = {

    URGENT: "urgent",
    HIGH: "high",
    NORMAL: "normal",
    LOW: "low"
}


internals.ZendeskExtensions.prototype.TicketStatus = {

    NEW: "new",
    OPEN: "open",
    PENDING: "pending",
    HOLD: "hold",
    SOLVED: "solved",
    CLOSED: "closed"
}

internals.ZendeskExtensions.prototype.createTicket = function (subject, body, ticketRequester, ticketPriority, ticketStatus, collaborators) {

    var data = {
        ticket: {
            subject: subject,
            comment: { body: body },
            priority: ticketPriority,
            status: ticketStatus,
            additional_collaborators: collaborators,
            requester: { name: ticketRequester.name, email: ticketRequester.email }
        }
    }


    return _post(data, "tickets")
}


internals.ZendeskExtensions.prototype.searchTickets = function (requester) {
    console.log("search for", requester)
    return _get({ query: `type:ticket requester:${requester}` }, 'search')
}



/* Private functions */

function _buildRequestOptions(data, endPoint) {

    var options = {
        url: ZendeskConfig.url + `/api/${ZendeskConfig.apiVersion}/${endPoint}.json`,
        headers: {
            'Authorization': 'Basic ' + new Buffer(ZendeskConfig.email + '/token:' + ZendeskConfig.token).toString('base64')
        },
        json: data
    }

    return options
}

function _post(data, endPoint) {

    return RequestPromise.post(_buildRequestOptions(data, endPoint))
}

function _get(data, endPoint) {

    return RequestPromise.get(_buildRequestOptions(data, endPoint))
}