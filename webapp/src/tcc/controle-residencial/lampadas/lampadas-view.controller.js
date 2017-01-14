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
        return LampadasViewService
          .getUltimoValorLampada()
          .then(function(response){
            return response;
          }); 
      }
  };

  LampadasViewController.$inject = ['$state','$http','LampadasViewService','getLastPreService','$scope'];
  function LampadasViewController($state,$http,LampadasViewService,getLastPreService,$scope){
    var vm = this;
    vm.isLigada = isLigada;
    vm.lampada = {};  
    vm.lampada.acesa = 0;
    vm.lastValor = getLastPreService;
    vm.valor = {};
    // if(vm.lastValor.length == 0 ){
    //   vm.lampada.acesa = 1;
    // }else{
    //   var intLast = vm.lastValor.length;
    //   var objetoLast = vm.lastValor[intLast-1];
    //   vm.lampada.acesa = objetoLast.status;
    //   console.log('valro da lampada',vm.lampada.acesa)
    // }
    atualizaValor();
    vm.enviarComando = enviarComando;

    function atualizaValor(){
      if(vm.lastValor.length == 0 ){
          vm.lampada.acesa = 0;
        }else{
          var intLast = vm.lastValor.length;
          var objetoLast = vm.lastValor[intLast-1];
          vm.lampada.acesa = objetoLast.status;
          vm.valor = objetoLast.status;
        }
    }
    function enviarComando(){
       var valorLampada = vm.lampada.novo;
       var lampadaCommand = {
        topico : 'topic_1',
        message : vm.valor
      }
      console.log('vm',lampadaCommand)
      LampadasViewService
        .enviarComando(lampadaCommand);

      if(vm.valor==1){
          vm.valor = 0;
        return;
      }
      if(vm.valor==0){
          vm.valor = 1;
        return;
      }
   
      
    }
      
 
    function getLast(){
      return LampadasViewService
       .getUltimoValorLampada()
       .then(function(response){
        console.log('the response',response)
        vm.lastValor = response;
        atualizaValor();
      }); 
    }

    function isLigada(){
      if(vm.valor == 1){
        return true;
      }
      return false;
    }

  }
}());