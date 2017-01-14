var awsIot = require('aws-iot-device-sdk');
var Corrente = require('../models/Corrente.js');
var Potencia = require('../models/Potencia.js');
var Vazao = require('../models/Vazao.js');
var Consumo = require('../models/Consumo.js');
var Lampada = require('../models/Lampada.js');


var device = awsIot.device({
  keyPath: './certificados/private.pem',
  certPath: './certificados/cert.pem',
  caPath: './certificados/rootCA.pem',
  clientId: 'platform',
  region: 'us-west-2'
});

device.subscribe('corrente/client1');
device.subscribe('potencia/client1');
device.subscribe('vazao/client1');
device.subscribe('consumo/client1');
device.subscribe('topic_1');

device
  .on('connect', function() {
    console.log('Device connect');
  device.subscribe('corrente/client1');
	device.subscribe('potencia/client1');
	device.subscribe('vazao/client1');
	device.subscribe('consumo/client1');
	device.subscribe('topic_1');
  });

  device
  .on('message', function(topic, message) {
  	console.log('ouviu topic',topic);

  	if(topic == 'corrente/client1'){
  		var mensagem = message.toString();
  		var correnteJson = JSON.parse(mensagem);
  		var corrente = new Corrente({
        corrente: correnteJson.payload,
        data: new Date()
      });
      corrente.save(function(err) {
        if (err) throw err;
      });
  	}
  	if(topic == 'potencia/client1'){
  		var mensagem = message.toString();
  		var potenciaJson = JSON.parse(mensagem);
  		var potencia = new Potencia({
        potencia: potenciaJson.payload,
        data: new Date()
      });
      potencia.save(function(err) {
        if (err) throw err;
      });
  	}

  	if(topic == 'vazao/client1'){
  		var mensagem = message.toString();
  		var vazaoJson = JSON.parse(mensagem);
  		var vazao = new Vazao({
        vazao: vazaoJson.payload,
        data: new Date()
      });
      vazao.save(function(err) {
        if (err) throw err;
      });
  	}

  	if(topic == 'consumo/client1'){
  		var mensagem = message.toString();
  		var consumoJson = JSON.parse(mensagem);
  		var consumo = new Consumo({
        consumo: consumoJson.payload,
        data: new Date()
      });
      consumo.save(function(err) {
        if (err) throw err;
      });
  	}

  	if(topic == 'topic_1'){
      console.log('topic_1 lampada message',message.toString());
      console.log('topic_1 lampada topic',topic)
  		var mensagem = message.toString();
  		
      var lampada = new Lampada({
        lampada: mensagem,
        data: new Date(),
        status : mensagem
      });
      lampada.save(function(err) {
        if (err) throw err;
      });
  	}

  })

module.exports = device;
