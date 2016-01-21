var app = angular.module('app', ['ngTouch', 'ui.grid']);
 
app.controller('MainCtrl', 
  ['$scope', '$http', function ($scope, $http) {
    $scope.gridOptions = {};
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.showGridFooter = true;
    $scope.gridOptions.showTreeExpandNoChildren = true;
    $scope.gridOptions.rowHeight = 50;
    $scope.gridOptions.columnDefs = [
      {name:'id', width: '10%', pinnedLeft: true},
      {name: 'name', width: '20%', displayName: 'Lead', cellClass: 'captial'},
      {name: 'header', width: '20%', displayName: 'Team', cellClass: 'captial'},
      {name: 'teams', width: '30%', displayName: 'Team members',
        cellTemplate: cellTemplate()
      }
    ];

    $http.get('http://www.json-generator.com/api/json/get/caKvMPxHVK')
      .success(function (data) {
        $scope.gridOptions.data = data;
    });

      function cellTemplate(){
        var cellStr = '<div class="ui-grid-cell-contents">';
        cellStr += '<div ng-repeat="team in row.entity.teams">{{team.member}}</div>';
        cellStr += '</div>';

        console.log(cellStr);

        return cellStr;
      }

      $scope.cellFormatter = function(cell){
        var cellStr = '<table>';
        cell.entity.teams.forEach(function(team){
          cellStr += '<tr><td>' + team.member + '</td></tr>';
        });

        cellStr += '</table>';
        return cellStr;
      }
  }
]);