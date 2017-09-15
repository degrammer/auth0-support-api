'use strict'

const internalDefinition = {}

exports = module.exports = internalDefinition.ServerManager = function(webServerProvider, routes){

   this.provider = webServerProvider
   this.routes = routes

   return this
}


internalDefinition.ServerManager.prototype.startServer = function(connection, events)
{
    
   if(!this.provider) throw 'You must specify a web server provider first'

   if(!this.provider.startServer || (typeof(this.provider.startServer) != 'function')) throw 'the web server provider should define a startServer method'

   if(!connection || !connection.config) throw 'A connection is required in order to start the server'

   if(!connection.config.host) connection.host = "localhost"

   if(!connection.config.port) connection.port = 8080

   if(!events) console.warn('starting server without an event system, suggestion: add event listeners')

   if(this.provider.addRoutes) this.provider.addRoutes(this.routes)

   this.provider.startServer(connection)
  
}