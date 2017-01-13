(function(){
'use strict';
angular
  .module('SensorConsumoControllers',[])
  .config(config)
  .controller('SensorConsumoController', SensorConsumoController);

  function config($stateProvider){
    $stateProvider
      .state('app.sensor-consumo',{
        url : '/sensor-consumo',
        templateUrl: 'src/tcc/controle-residencial/sensores/sensor-consumo.html',
        controller : 'SensorConsumoController',
        controllerAs : 'vm',
      });
  };

  SensorConsumoController.$inject = ['$state','$http','SensoresService'];
  function SensorConsumoController($state,$http,SensoresService){
    var vm = this;
    vm.returnArray = [];
    
    // carregaGraficoEmBarras();	

    function carregaGraficoEmBarras(){
      var chart = new CanvasJS.Chart("chartContainerBarra",
      {
      title:{
        text: "Grafico Valores"
      },
      axisY:{
       interval: 1 ,
       intervalType : "minute"
     },
      data: [

      {
      	type: "line",
        dataPoints: 
        	// crateDataPointCorrente(){ x: 10, y: 1, label: "Corrente"},
        	crateDataPointCorrente()
      }
      ]
      });

      chart.render();
      chart.options.data[0].dataPoints = [];
     }

     
     function crateDataPointCorrente(){
     	 carregaDados();
     	 var returnArray = [];

     	 console.log('xxxx',vm.listaConsumo)
     	 angular.forEach(vm.listaConsumo, function(value) {
			var obj = {
			x: value.data,
			y: value.consumo
			}
			returnArray.push(obj);	
		});
     	
     	// var obj = [
	     //      {
		    //      x: 332,
		    //      y: 26,
		    //    }
		    // ]
	     //      return obj;
     	console.log('returnArray',returnArray)
   		return returnArray;

     }

     function carregaDados(){
		// return SensoresService
		// 	.getAllConsumo()
		// 	.then(function(response){
		// 		angular.forEach(response, function(value) {
		// 			console.log('value',value)
		// 			var obj = {
		// 			x: value.data,
		// 			y: value.consumo
		// 			}
		// 			vm.returnArray.push(obj);
		// 			return vm.returnArray;
		// 		});
				


		// });
		return SensoresService
	        .getAllConsumo()
	        .then(function(response){
	          vm.listaConsumo = response;
	          carregaGraficoEmBarras();
	        });
     }

  }
}());