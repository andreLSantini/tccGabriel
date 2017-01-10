(function(){
'use strict';
  angular
    .module('LampadasViewServices',[])
    .factory('LampadasViewService', LampadasViewService);

  LampadasViewService.$inject = ['$http'];

  function LampadasViewService($http){
    var service = this;
    service.enviarComando = enviarComando;
    service.getUltimoValorLampada = getUltimoValorLampada;
   
    return service;


    function  enviarComando(command){
    	var method = 'POST'
        , url = '/app/publicar';
      return $http({
        url : url,
        method : method,
        data : command
      }).then(function(response){
        return response;
      });
    }

    function getUltimoValorLampada(){
      var method = 'GET'
        , url = '/app/listar';
      return $http({
        url : url,
        method : method
      }).then(function(response){
        return response.data;
      });
    }
   
  }
}());
