var bodyParser = require('body-parser')
	,	http 	   	 = require('http') 
	,	express    = require('express')
	,	app 	     = express()
	,   banco 	  = require('./Schema.js')
	,   Corrente 	  = require('./Schema.js')
	,	aluno 	   = require('./Schema.js');	

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath: './certificados/private.pem',
	certPath: './certificados/cert.pem',
	caPath: './certificados/rootCA.pem',
	clientId: 'platform',
	region: 'us-west-2'
});

device
  .on('connect', function() {
    console.log('connect');
    });


SubscribeEvents();
EventAndSave();

function PublicaEmEvento(topic,message){
	console.log('topic',topic)
	console.log('message',message)
	device.publish(topic.toString(), message.toString() );
}


function EventAndSave(){
	device
	  .on('message', function(topic, message) {
	    if(topic == 'topic_1'){
			var corrente = new banco(
			{ 
				lampada : message.toString(),
				data : new Date(),
				status : message.toString()

			});

			corrente.save(function(err) {
			if (err) throw err;
			});
	 
	    }

	  });

}

function SubscribeEvents(){
	device.subscribe('corrente/client1');
	device.subscribe('potencia/client1');
	device.subscribe('vazao/client1');
	device.subscribe('consumo/client1');
	device.subscribe('topic_1');
}



app.get('/', function (req, res){
	res.sendFile(__dirname + '/webapp/index.html');
})

app.post('/app/publicar', function (req, res) {
	console.log('req',req.body)
	PublicaEmEvento(req.body.topico,req.body.status);

})

app.post('/app/cadastrar', function (req, res) {
	var newAluno = new aluno(
		{ nome: req.body.nome, 
			curso: req.body.curso
		});

	newAluno.save(function(err) {
		if (err) throw err;
	});
	 
	res.json({ message: 'Aluno recebido', data: req.body.nome});
})

app.get('/app/listarById/:id', function (req, res) {
	aluno.findOne({ _id: req.params.id }, function(err, todos) {
		if (err) throw err;
		res.json(todos);
	});
})

app.get('/app/listar', function (req, res) {
	aluno.find(function(err, todos) {
		if (err) throw err;
		res.json(todos);
	});
})

app.delete('/app/delete/:id', function (req, res) {
	aluno.findOneAndRemove({ _id: req.params.id }, function(err) {
		if (err) throw err;
	});
	res.json({ message: 'Aluno excluido'});
})

app.put("/app/editar", function(req, res){
	aluno.findByIdAndUpdate(req.body._id, { nome: req.body.nome, curso: req.body.curso }, function(err, user) {
		if (err) res.send(err);
		res.json({ message: 'Aluno alterado'});
	});
});


app.get('/app/listarcorrente',function (req,res){
	console.log('--->',Corrente)
	Corrente.find(function(err,todos) {
		if(err) throw err;
		res.json(todos);
	})
})



app.use(express.static(__dirname + '/webapp'));

app.listen(3000)
console.log("localhost:3000")