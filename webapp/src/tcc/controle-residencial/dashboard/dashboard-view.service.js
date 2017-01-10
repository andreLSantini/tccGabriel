(function(){
'use strict';
  angular
    .module('DashBoardServices',[])
    .factory('DashBoardService', DashBoardService);

  DashBoardService.$inject = ['$http'];

  function DashBoardService($http){
    var service = this;
   	service.getAllCorrente = getAllCorrente;
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
  }
}());
