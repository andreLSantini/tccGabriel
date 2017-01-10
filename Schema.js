var mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost/Escola');

var db = mongoose.connection;  
db.on('error', function(err){  
	console.log('Mongodb - Erro de conexao.', err)
});

db.on('open', function () {  
	console.log('Mongodb - Conexão aberta.')
});

db.on('connected', function(err){  
	console.log('Mongodb - Conectado')
});

db.on('disconnected', function(err){  
	console.log('Mongodb - Desconectado')
});

var Schema = mongoose.Schema;

var alunoShema = new Schema({
	nome: String,
	curso: String
});


var corrente = new Schema({
	corrente : String,
	data : Date
});

var potencia = new Schema({
	potencia : String,
	data : Date
});

var vazao = new Schema({
	vazao : String,
	data : Date
});

var consumo = new Schema({
	consumo : String,
	data : Date
});

var lampada = new Schema({
	lampada : String,
	data : Date,
	status : String
});


var Corrente = mongoose.model('corrente', corrente);
var Potencia = mongoose.model('potencia', potencia);
var Vazao = mongoose.model('vazao', vazao);
var Lampada = mongoose.model('lampada', lampada);

module.exports = mongoose.model('Aluno', alunoShema);

module.exports = Corrente;
module.exports = Potencia;
module.exports = Vazao;
module.exports = Lampada;

