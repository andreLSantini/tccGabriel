var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var potencia = new Schema({
  potencia: String,
  data: Date
});

module.exports = mongoose.model('Potencia', potencia);