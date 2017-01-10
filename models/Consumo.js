var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var consumo = new Schema({
  consumo: String,
  data: Date
});

module.exports = mongoose.model('Consumo', consumo);