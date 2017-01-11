(function(){
'use strict';
  angular
    .module('DashBoardServices',[])
    .factory('DashBoardService', DashBoardService);

  DashBoardService.$inject = ['$http'];

  function DashBoardService($http){
    var service = this;
   	service.getAllCorrente = getAllCorrente;
    service.getAllLampadas = getAllLampadas;
    service.getAllPotencia = getAllPotencia; 
    service.getAllVazao = getAllVazao;
    service.getAllConsumo = getAllConsumo;
    return service;
   

   function getAllCorrente(){
   	 var method = 'GET'
        , url = '/app/listarcorrente';
      return $http({
        url : url,
        method : method
      }).then(function(response){
      	console.log('response',response)
        return response.data;
      });
   }

   function getAllLampadas(){
     var method = 'GET'
        , url = '/app/listarlampadas';
      return $http({
        url : url,
        method : method
      }).then(function(response){
        console.log('response',response)
        return response.data;
      });
   }

   function getAllPotencia(){
     var method = 'GET'
        , url = '/app/listarpotencia';
      return $http({
        url : url,
        method : method
      }).then(function(response){
        console.log('response',response)
        return response.data;
      });
   }

   function getAllVazao(){
     var method = 'GET'
        , url = '/app/listarvazao';
      return $http({
        url : url,
        method : method
      }).then(function(response){
        console.log('response',response)
        return response.data;
      });
   }

   function getAllConsumo(){
     var method = 'GET'
        , url = '/app/listarconsumo';
      return $http({
        url : url,
        method : method
      }).then(function(response){
        console.log('response',response)
        return response.data;
      });
   }

  }
}());
