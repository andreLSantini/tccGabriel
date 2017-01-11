(function(){
'use strict';
angular
  .module('LampadasViewControllers',[])
  .config(config)
  .controller('LampadasViewController', LampadasViewController);

  function config($stateProvider){
    $stateProvider
      .state('app.lampadas-view',{
        url : '/lampadas-view',
        templateUrl: 'src/tcc/controle-residencial/lampadas/lampadas-view.html',
        controller : 'LampadasViewController',
        controllerAs : 'vm',
        resolve: {
            getLastPreService : getLastPreService        
        }
      });

      function getLastPreService(LampadasViewService){
        // return LampadasViewService
        //   .getUltimoValorLampada()
        //   .then(function(response){
        //     return response;
        //   }); 
        return ;
      }
  };

  LampadasViewController.$inject = ['$state','$http','LampadasViewService','getLastPreService'];
  function LampadasViewController($state,$http,LampadasViewService,getLastPreService){
    var vm = this;
    vm.isLigada = isLigada;
    vm.lampada = {};  
    vm.lampada.acesa = 1;
    verificaEAplicaValorDaLampada(getLastPreService);

    vm.enviarComando = enviarComando;


    function enviarComando(){
       vm.lampada = {
        topico : 'topic_1',
        message : vm.lampada.acesa
      }
      console.log('vm',vm.lampada)
      LampadasViewService
        .enviarComando(vm.lampada);
       getLast();
    }
      
     function getLast(){
       return LampadasViewService
          .getUltimoValorLampada()
          .then(function(response){
           verificaEAplicaValorDaLampada(response);
          });

    }
       
    function verificaEAplicaValorDaLampada(arrayValues){
      console.log('rassss',arrayValues)
      if(Array.isArray(arrayValues)){
        console.log('arrayValues[arrayValues.length-1].status;',arrayValues[arrayValues.length-1].status)
        if(arrayValues[arrayValues.length-1].status == 1){
          vm.lampada.acesa = 0;
        }
        if(arrayValues[arrayValues.length-1].status == 0){
          vm.lampada.acesa = 1;
        }
      }
    } 

    function isLigada(){
      if(vm.lampada.acesa == 1){
        return true;
      }
      return false;
    }

  }
}());