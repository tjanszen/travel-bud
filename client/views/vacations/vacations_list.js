'use strict';

angular.module('angular-prototype')
  .controller('VacationsListCtrl', ['$scope', 'Vacation', '$state', function($scope, Vacation, $state){
    Vacation.list()
    .then(function(response){
      console.log(response.data);
      $scope.vacations = response.data.vacations;
    });

    $scope.show = function(vacation){
      $state.go('vacation.show')
    }
  }]);
