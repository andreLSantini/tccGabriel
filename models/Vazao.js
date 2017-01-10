var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vazao = new Schema({
  vazao: String,
  data: Date
});

module.exports = mongoose.model('Vazao', vazao);