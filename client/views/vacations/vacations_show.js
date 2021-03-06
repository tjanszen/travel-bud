'use strict';

angular.module('angular-prototype')
.controller('VacationsShowCtrl', ['$scope', 'Vacation', 'Trip', '$state', function($scope, Vacation, Trip, $state){
  Vacation.show($state.params.vacationId)
  .then(function(response){
    $scope.vacation = response.data.vacation;
  });

  $scope.$on('flight-purchased', (event, vacation)=>{
    $scope.vacation = vacation;
  })

  $scope.findFlights = function(){
    Trip.findFlights($state.params.vacationId)
    .then(function(response){
      $scope.flights = response.data;
    });
  };
}]);
