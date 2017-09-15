"use strict"

const internals = {}

exports = module.exports = internals.Route = function(method, path, handler)
{
    this.method = method
    this.path = path
    this.handler = handler
    
    return this
}