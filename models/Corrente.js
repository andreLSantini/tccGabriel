var mongoose = require('mongoose');  

var Schema = mongoose.Schema;

var corrente = new Schema({
	corrente : String,
	data : Date
});

module.exports = mongoose.model('Corrente', corrente);

