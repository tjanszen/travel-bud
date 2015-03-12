'use strict';

angular.module('angular-prototype')
  .controller('VacationsShowCtrl', ['$scope', 'Vacation', 'Trip', '$state', function($scope, Vacation, Trip, $state){
    Vacation.show($state.params.vacationId)
    .then(function(response){
      $scope.vacation = response.data.vacation;
    });
    $scope.findFlights = function(vacation){
      Trip.findFlights($state.params.vacationId)
        .then(function(response){
          console.log(response.data);
          $scope.flights = response.data;
        });
    };
  }]);
