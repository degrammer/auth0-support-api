"use strict"

exports = module.exports = (function () {

    return {
        connection: {
            port: 4000,
            host: 'localhost',
            staticFolder: 'site',
            mainFile: 'index.html',
            handleClientSideRouting: true
        },
        zendesk: {
            token: 'VjEZY7dv7184XAJElIZohGXwlluM7h6K5pResWOj',
            url: 'https://metacode.zendesk.com',
            email: 'rubenchorestrepo@gmail.com',
            apiVersion: 'v2'
        }
    }
})()