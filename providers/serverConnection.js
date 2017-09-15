'use strict'

const serverConnectionDefinition = {}


/**
 * Represents a ServerConnection
 * @constructor
 * @return {ServerConnection}
 * 
 */
exports = module.exports = serverConnectionDefinition.ServerConnection = function(config)
{
    
    this.config = config

    return this
}