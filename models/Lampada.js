var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lampada = new Schema({
  lampada: String,
  data: Date,
  status: String
});

module.exports = mongoose.model('Lampada', lampada);