(function(){
'use strict';
  angular
    .module('SensoresServices',[])
    .factory('SensoresService', SensoresService);

  SensoresService.$inject = ['$http'];

  function SensoresService($http){
    var service = this;
  
   	service.getAllConsumo = getAllConsumo;
   	
    return service;

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
