'use strict';

angular.module('angular-prototype')
  .controller('VacationsShowCtrl', ['$scope', 'Vacation', '$state', function($scope, Vacation, $state){
    Vacation.show($state.params.vacationId)
    .then(function(response){
      $scope.vacation = response.data.vacation;
    })
  }]);
