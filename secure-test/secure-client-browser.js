/**
 * This script demonstrates a MOWS browser client connecting to a server over HTTP and HTTPS.
 *
 * It is designed to work with 'secure-test/secure-server.js'. Note the server makes use of self-signed
 * certificates under the domain 'my.webserver.com'. To test this script locally, you will need to make this
 * domain accessible by editing your Hosts file.
 */

/**
 * Simple method to assist in adding events to a client
 */
var applyEventHandlers = function(client)
{
    client.on('connect', function(){
        console.log('Client Connected as ', client.options.clientId);
        client.subscribe('/hiworld');
        client.publish('/hiworld', 'Hello World');
    });

    client.on('error', function(e){
        console.log('Client Error:', e);
    });

    client.on('message', function(topic, message){
        console.log('Client received message:', topic, message);
        client.end();
    });
};

/**
 * Example #1 - connect to an unsecure MOWS server
 */
var unsecureClient1 = mows.createClient(665, 'ws://my.webserver.com');
applyEventHandlers(unsecureClient1);

/**
 * Example #2 - connect to a secure MOWS server
 */
var unsecureClient2 = mows.createClient(666, 'wss://my.webserver.com');
applyEventHandlers(unsecureClient2);