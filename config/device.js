var awsIot = require('aws-iot-device-sdk');

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
  });

module.exports = device;