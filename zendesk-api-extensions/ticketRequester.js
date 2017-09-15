"use strict"

const internals = {}

exports = module.exports = internals.TicketRequester = function(name, email)
{
    this.name = name
    this.email = email

    return this
}