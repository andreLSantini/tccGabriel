var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var app = express();
var bd = require('./config/bd.js');
var device = require('./config/device.js');


var Corrente = require('./models/Corrente.js');
var Potencia = require('./models/Potencia.js');
var Vazao = require('./models/Vazao.js');
var Consumo = require('./models/Consumo.js');
var Lampada = require('./models/Lampada.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/webapp/index.html');
})


app.post('/app/publicar', function(req, res) {
  var topico = req.body.topico;
  var mensagem = req.body.message;
      device.publish(topico, mensagem, function() {
            console.log("mensagem sent: " + mensagem);
        });
});



app.get('/app/listarcorrente', function(req, res) {

  Corrente.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/app/listarpotencia', function(req, res) {
  Potencia.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/app/listarvazao', function(req, res) {
  Vazao.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/app/listarconsumo', function(req, res) {
  Consumo.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/app/listarlampadas', function(req, res) {
  Lampada.find(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.use(express.static(__dirname + '/webapp'));

app.listen(3000)
console.log("localhost:3000")