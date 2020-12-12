const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', webSocket => {
  webSocket.on('message', message => {
    console.log('Received:', message);
    broadcast(message);
  });
});

function broadcast(data) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(80);