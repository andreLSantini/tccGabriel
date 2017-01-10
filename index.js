var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
var bd = require('./config/bd.js');
var device = require('./config/device.js');
var Corrente = require('./models/Corrente.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/webapp/index.html');
})

device
  .on('message', function(topic, message) {
    if (topic == 'topic_1') {
      var corrente = new Corrente({
        corrente: message,
        data: new Date()
      });
      corrente.save(function(err) {
        if (err) throw err;
      });
    }
  });

app.post('/app/publicar', function(req, res) {
  console.log('req', req.body)
  device.publish(req.body.topic.toString(), req.body.message.toString());
});

app.get('/app/listarcorrente', function(req, res) {
  Corrente.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.use(express.static(__dirname + '/webapp'));

app.listen(3000)
console.log("localhost:3000")