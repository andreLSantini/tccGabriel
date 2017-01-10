var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/devices');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongodb - Erro de conexao.', err)
});

db.on('open', function() {
  console.log('Mongodb - Conexão aberta.')
});

db.on('connected', function() {
  console.log('Mongodb - Conectado')
});

db.on('disconnected', function(err) {
  console.log('Mongodb - Desconectado')
});