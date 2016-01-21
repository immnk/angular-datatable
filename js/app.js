var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 
  'ui.grid.pinning', 'ui.grid.grouping', 'ui.grid.resizeColumns', 'ui.grid.autoResize',
  'ui.grid.selection' ]);
 
app.controller('MainCtrl', ['$scope', '$http', 'uiGridGroupingConstants', '$interval',
  function ($scope, $http, uiGridGroupingConstants, $interval) {

  function init(){
    $scope.search = {
      frontLease : 'Monthly',
      interactionType : 'All',
      ratingType : 'All',
      transactionType : 'All'
    }

    $interval(function(){
      $scope.expandAll();
    }, 1000, 1); // Init time to be 1 second
  }

  init();

  $scope.filter = function(){
    console.log('button clicked...');
    console.log("interactionType: " + $scope.search);
    
    var rootNode = $("#tree3").dynatree("getRoot");
    var selKeys = $.map(rootNode.getSelectedNodes(), function(node){
      return node.data.key;
    });

    var textTeamSelected = "Team - " + selKeys.join(", ");
    $("#selectedTeam").text(textTeamSelected);
  }

  $scope.gridOptions = {
  };

  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGrouping = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.rowHeight = 50;
  $scope.gridOptions.headerTemplate = 'headerRow';
  $scope.gridOptions.rowTemplate = myRowTemplate();
  $scope.gridOptions.treeRowHeaderAlwaysVisible = true;
  $scope.gridOptions.enableRowHeaderSelection = false;
  $scope.gridOptions.enableSelectAll = false;
  $scope.gridOptions.multiSelect = false;
  $scope.gridOptions.category = [
    {name: 'Rating', visible: true,showCatName: false},
    {name: 'EmpName', visible: true,showCatName: false},
    {name: 'Quater1', visible: true,showCatName: true},
    {name: 'Quater2', visible: true,showCatName: true}
  ]
  $scope.gridOptions.columnDefs = [
    {name: 'rating', width: '10%', displayName: 'Rating', cellClass: 'captial',
      grouping: { groupPriority: 0 },
      cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>',
      category:"Rating", enableColumnMenu: false
    },
    {name: 'empName', width: '10%', displayName: 'Emp Name', cellClass: 'captial',
      treeAggregationType: uiGridGroupingConstants.aggregation.COUNT,
      customTreeAggregationFinalizerFn : function ( aggregation ){
        aggregation.rendered = aggregation.value + ' employees';
      },
      category:"EmpName", enableColumnMenu: false
    },
    {name:'weeks[0].points', displayName : 'Week 1', width: '40%',
      cellTemplate: pointTemplate(0),
      customTreeAggregationFn : myCustomAggrtr,
      customTreeAggregationFinalizerFn : function ( aggregation ){
        aggregation.rendered = aggregation.value + ' points';
      },
      headerCellTemplate: 'expandCellTemplate',
      category:"Quater1", enableColumnMenu: true
    },
    {name:'weeks[1].points', displayName : 'Week 2', width: '40%', 
      cellTemplate: pointTemplate(1),
      headerCellTemplate: 'expandCellTemplate',
      category:"Quater1", enableColumnMenu: true
    },
    {name:'weeks[2].points', displayName : 'Week 3', width: '40%', 
      cellTemplate: pointTemplate(2),
      headerCellTemplate: 'expandCellTemplate',
      category:"Quater2", enableColumnMenu: true
    },
  ];

  $scope.gridOptions.onRegisterApi = function( gridApi ) {
    $scope.gridApi = gridApi;
  }

  $scope.gridOptions.init = function(){
    console.log('init finished...');
    $scope.gridApi.treeBase.expandAllRows();
  }
 
  $http.get('http://www.json-generator.com/api/json/get/bRUzytfAaG')
    .success(function(data) {
      $scope.gridOptions.data = data.rowdata;
    });

  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };

  function pointTemplate(i){
    var cellStr = '<div class="ui-grid-cell-contents" ng-class="{trim:row.entity.weeks['
      + i +'].points != undefined}">';
    cellStr  += '<button class="rowexpand" ng-if="row.entity.weeks['+i+'].points != undefined" '
      + 'class="btn btn-default btn-xs"'
      + 'ng-click="grid.appScope.expandRow(row, i)"'
      + '><i class="fa fa-arrow-down"></i>{{row.entity.weeks['
      + i +'].points.length}}</button>';
    cellStr  += '<button class="columnexpand" ng-if="row.entity.weeks['+i+'].points != undefined" '
      + 'class="btn btn-default btn-xs"'
      + 'ng-click="grid.appScope.expandWidth('+ i +')"'
      + '><i class="fa fa-arrows-alt"></i></button>';
    cellStr += '<ul class="list-group"><li class="list-group-item" ng-repeat="point in row.entity.weeks['
      + i +'].points">'
      + '<div class="texttrim">{{point.point}}</div></li>';
    cellStr += '</ul></div>';
    return cellStr;
  }

  function myCustomAggrtr(aggregation, fieldValue, numValue, row ){
    var nPoints = fieldValue.length;

    // if ( typeof(aggregation.count) === 'undefined' ){
    //   aggregation.count = 0;
    // }
    // aggregation.count++;
   
    // if ( !isNaN(nPoints) ){
    //   if ( typeof(aggregation.total) === 'undefined' ){
    //     aggregation.total = 0;
    //   }
    //   aggregation.total = aggregation.total + nPoints;
    // }
   
    aggregation.value = nPoints;

    // console.debug(aggregation);
  }

  function myRowTemplate(){
    return '<div ng-repeat="(colRenderIndex, col) '+
           'in colContainer.renderedColumns track by col.colDef.name" '+
           'class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"'+
           '  ui-grid-cell></div>';
  }

  $scope.expandRow = function(row, i){
    // expand row here...
    console.log('button clicked');
    console.log(i);
    console.debug(row.entity);
    // alert('button clicked by: ' + row.entity.weeks);
  }

  $scope.expandColumns = function(){
    var week0 = $scope.gridApi.grid.getColumn('weeks[0].points').width;

    if(week0 == "40%"){
      $scope.gridApi.grid.getColumn('weeks[0].points').width = "78%";
      $scope.gridApi.grid.getColumn('weeks[1].points').width = "78%";
      $scope.gridApi.grid.getColumn('weeks[2].points').width = "78%";
    }
    else{
      $scope.gridApi.grid.getColumn('weeks[0].points').width = "40%";
      $scope.gridApi.grid.getColumn('weeks[1].points').width = "40%";
      $scope.gridApi.grid.getColumn('weeks[2].points').width = "40%";
    }
    $scope.gridApi.grid.refresh();
  }

  $scope.expandWidth = function(i){
    var columnName = 'weeks['+ i +'].points';
    $scope.gridApi.grid.getColumn(columnName).width = "78%";
    $scope.gridApi.grid.refresh();
  }

  $scope.expandColumn = function(colName, $event){
    $event.stopPropagation();

    var week0 = $scope.gridApi.grid.getColumn(colName).width;

    if(week0 == "40%"){
      $scope.gridApi.grid.getColumn(colName).width = "78%";
    }
    else{
      $scope.gridApi.grid.getColumn(colName).width = "40%";
    }
    $scope.gridApi.grid.refresh();
  }
 
}]);