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

  DashBoardController.$inject = ['$state','DashBoardService'];
  function DashBoardController($state,DashBoardService){
    var vm = this;

    vm.getAllCorrente = getAllCorrente;

    function getAllCorrente(){
      return DashBoardService
        .getAllCorrente()
        .then(function(response){
          console.log('kkkkkkk,',response)
        });
    }

    getAllCorrente();

  google.charts.load('current', {packages: ['corechart', 'line']});
	google.charts.setOnLoadCallback(drawBasic);	
	google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawBarColors);
 	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawBasic2);

	function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'BIRL');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ]);

      var options = {
        hAxis: {
          title: 'Tempo em horas'
        },
        vAxis: {
          title: 'Sei la'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }

      function drawBarColors() {
      var data = google.visualization.arrayToDataTable([
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ]);

      var options = {
        title: 'Population of Largest U.S. Cities',
        chartArea: {width: '50%'},
        colors: ['#b0120a', '#ffab91'],
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'City'
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
      chart.draw(data, options);
    }

  function drawBasic2() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);

      var options = {
        title: 'Motivation Level Throughout the Day',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div3'));

      chart.draw(data, options);
    }


   	vm.init = init;
   	init();

   	function init(){

   	}	


  }
}());