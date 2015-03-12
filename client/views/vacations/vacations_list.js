'use strict';

angular.module('angular-prototype')
  .controller('VacationsListCtrl', ['$scope', 'Vacation', '$state', function($scope, Vacation, $state){
    Vacation.list()
    .then(function(response){
      $scope.vacations = response.data.vacations;
    });

    $scope.show = function(){
      $state.go('vacation.show');
    };
  }]);
