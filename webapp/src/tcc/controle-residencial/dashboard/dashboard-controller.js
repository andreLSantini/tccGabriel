(function(){
'use strict';
angular
  .module('DashBoardControllers',[])

  .config(config)
  .controller('DashBoardController', DashBoardController);


  function config($stateProvider){
    $stateProvider
      .state('app.dashboard-view',{
        url : '/dashboard-view',
        templateUrl: 'src/tcc/controle-residencial/dashboard/dashboard-view.html',
        controller : 'DashBoardController',
        controllerAs : 'vm'
      });
  };

  DashBoardController.$inject = ['$state','DashBoardService','socket','$scope'];
  function DashBoardController($state,DashBoardService,socket,$scope){
    var vm = this;
    vm.listaCorrete = [];
    vm.listaPotencia = [];
    vm.listaLampadas = [];
    vm.listaVazao = [];
    vm.listaConsumo = [];

    vm.getAllCorrente = getAllCorrente;
    vm.getAllPotencia = getAllPotencia;
    vm.getAllLampadas = getAllLampadas;
    vm.getAllVazao = getAllVazao;
    vm.getAllConsumo = getAllConsumo;

    

    $scope.ultimoConsumo = 1;
    $scope.ultimapotencia = 1;
    $scope.ultimavazao = 1;
    $scope.ultimacorrente = 1;
    // getAllCorrente();
    // getAllPotencia();
    // getAllLampadas();
    // getAllVazao();
    // getAllConsumo();


    var socket = io.connect();

        socket.on('potencia/client1',function(message){
              $scope.ultimapotencia = message;
              $scope.$apply();

        });
        socket.on('consumo/client1',function(message){
              $scope.ultimoConsumo = message;
              $scope.$apply();
        });
         socket.on('vazao/client1',function(message){
              $scope.ultimavazao = message;
              $scope.$apply();

        });
        socket.on('corrente/client1',function(message){
              $scope.ultimacorrente = message;
              $scope.$apply();
        });

      criaChartPotencia();
      criaChartConsumo(); 
      criaChartVazao(); 
      criaChartCorrente(); 
    
    function criaChartPotencia(){
        var dps = [];
         var chart = new CanvasJS.Chart("chartContainerPotencia",{
            title :{
                  text: "Grafico Potencia"
            },
            axisX: {                                  
                  title: "o que por aqui?"
            },
            axisY: {                                  
                  title: "Valor"
            },
            data: [{
                  type: "line",
                  dataPoints : dps
            }]
      });

      chart.render();
      var xVal = dps.length + 1;
      var yVal = 3;    
      var updateInterval = 1000;

       function updateChartPotencia(valor){

            socket.on('potencia/client1',function(message){
              yVal = yVal + 3;
              dps.push({x: xVal,y: parseInt(message)});
             });
            
            xVal++;
            if (dps.length >  10 )
            {
                  dps.shift();                        
            }

            chart.render();     

    } 

      setInterval(function(){updateChartPotencia()}, updateInterval);
    } 

    function criaChartConsumo(){
        var dps = [];
         var chart = new CanvasJS.Chart("chartContainerConsumo",{
            title :{
                  text: "Grafico Consumo"
            },
            axisX: {                                  
                  title: "o que por aqui?"
            },
            axisY: {                                  
                  title: "Valor"
            },
            data: [{
                  type: "line",
                  dataPoints : dps
            }]
      });

      chart.render();
      var xVal = dps.length + 1;
      var yVal = 3;    
      var updateInterval = 1000;

       function updateChartConsumo(valor){

            
            socket.on('consumo/client1',function(message){
              yVal = yVal + 3;
              dps.push({x: xVal,y: parseInt(message)});
             });
            
            xVal++;
            if (dps.length >  10 )
            {
                  dps.shift();                        
            }

            chart.render();     

    } 

      setInterval(function(){updateChartConsumo()}, updateInterval);
    } 

     function criaChartVazao(){
        var dps = [];
         var chart = new CanvasJS.Chart("chartContainerVazao",{
            title :{
                  text: "Grafico Vazao"
            },
            axisX: {                                  
                  title: "o que por aqui?"
            },
            axisY: {                                  
                  title: "Valor"
            },
            data: [{
                  type: "line",
                  dataPoints : dps
            }]
      });

      chart.render();
      var xVal = dps.length + 1;
      var yVal = 3;    
      var updateInterval = 1000;

       function updateChartVazao(valor){

            socket.on('vazao/client1',function(message){
              yVal = yVal + 3;
              dps.push({x: xVal,y: parseInt(message)});
             });
            
            xVal++;
            if (dps.length >  10 )
            {
                  dps.shift();                        
            }

            chart.render();     

    } 

      setInterval(function(){updateChartVazao()}, updateInterval);
    } 

     function criaChartCorrente(){
        var dps = [];
         var chart = new CanvasJS.Chart("chartContainerCorrente",{
            title :{
                  text: "Grafico Corrente"
            },
            axisX: {                                  
                  title: "o que por aqui?"
            },
            axisY: {                                  
                  title: "Valor"
            },
            data: [{
                  type: "line",
                  dataPoints : dps
            }]
      });

      chart.render();
      var xVal = dps.length + 1;
      var yVal = 3;    
      var updateInterval = 1000;

       function updateChartCorrente(valor){

            // yVal = yVal +  Math.round(5 + Math.random() *(-5-5));

            socket.on('corrente/client1',function(message){
              yVal = yVal + 3;
              dps.push({x: xVal,y: parseInt(message)});
             });
            
            xVal++;
            if (dps.length >  10 )
            {
                  dps.shift();                        
            }

            chart.render();     

    } 

      setInterval(function(){updateChartCorrente()}, updateInterval);
    } 

     
    function getAllCorrente(){
      return DashBoardService
        .getAllCorrente()
        .then(function(response){
          console.log('getAllCorrente,',response)
          vm.listaCorrete = response;
          carregaGraficoEmBarras();
        });
    }

    function getAllPotencia(){
      return DashBoardService
        .getAllPotencia()
        .then(function(response){
          console.log('getAllPotencia,',response)
          vm.listaPotencia = response;
          carregaGraficoEmBarras();
        });
    }

    function getAllLampadas(){
      return DashBoardService
        .getAllLampadas()
        .then(function(response){
          console.log('getAllLampadas,',response)
          vm.listaLampadas = response;
          carregaGraficoEmBarras();
        });
    }

    function getAllVazao(){
      return DashBoardService
        .getAllVazao()
        .then(function(response){
          console.log('getAllVazao,',response)
          vm.listaVazao = response;
          carregaGraficoEmBarras();
        });
    }

    function getAllConsumo(){
      return DashBoardService
        .getAllConsumo()
        .then(function(response){
          console.log('getAllConsumo,',response)
          vm.listaConsumo = response;
          carregaGraficoEmBarras();
        });
    }

    function mediaCorrente(listCorrente){
      var mediaCorrenteObj = 0;
      angular.forEach(listCorrente, function(value) {
        if(value.corrente != ''){
            mediaCorrenteObj += parseInt(value.corrente);
        }
      });
      return mediaCorrenteObj/listCorrente.length;
    }

    function mediaConsumo(listConsumo){
      var mediaConsumoObj = 0;
      angular.forEach(listConsumo, function(value) {
        if(value.consumo != ''){
            mediaConsumoObj += parseInt(value.consumo);
        }
      });
      return mediaConsumoObj/listConsumo.length;
    }

     function mediaPotencia(listPotencia){
      var mediaPotenciaObj = 0;
      angular.forEach(listPotencia, function(value) {
        if(value.potencia != ''){
            mediaPotenciaObj += parseInt(value.potencia);
        }
      });
      return mediaPotenciaObj/listPotencia.length;
    }

     function mediaVazao(listVazao){
      var mediaVazaoObj = 0;
      angular.forEach(listVazao, function(value) {
        if(value.vazao != ''){
            mediaVazaoObj += parseInt(value.vazao);
        }
      });
      return mediaVazaoObj/listVazao.length;
    }

     function mediaLampadas(listLampadas){
      var mediaLampadasObj = 0;
      angular.forEach(listLampadas, function(value) {
        if(value.lampadas != ''){
            mediaLampadasObj += parseInt(value.lampadas);
        }
      });
      return mediaLampadasObj/listLampadas.length;
    }

     function getCorrenteMedia(){
        var valor = mediaCorrente(vm.listaCorrete);
        return parseInt(valor) || 0;
     }

     function getPotenciaMedia(){
        var valor = mediaPotencia(vm.listaPotencia);
        return parseInt(valor) || 0;
     }

     function getVazaoMedia(){
       var valor = mediaVazao(vm.listaVazao);
       return parseInt(valor) || 0;
     }

     function getConsumoMedia(){
       var valor = mediaConsumo(vm.listaConsumo);
       return parseInt(valor) || 0;
     }

   

   	vm.init = init;
   	init();

   	function init(){

   	}


  }
}());
