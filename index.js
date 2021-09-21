var express = require('express');
const path = require("path");
var app = express();
var port = 8080;
app.use(express.static(path.join(__dirname, 'public')));
// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/metamask', function(req, res) {
    res.sendFile(__dirname + "/metaMask.html");
});

app.get('/tronLink', function(req, res) {
    res.sendFile(__dirname + "/tronLink.html");
});

// app.get('/tron.js', function(req, res){
//     res.sendFile(__dirname + './tron.js');
// })