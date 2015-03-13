'use strict';

angular.module('angular-prototype')
  .controller('VacationsShowCtrl', ['$scope', 'Vacation', 'Trip', '$state', function($scope, Vacation, Trip, $state){
    Vacation.show($state.params.vacationId)
    .then(function(response){
      $scope.vacation = response.data.vacation;
      console.log('****************', $scope.vacation);
    });

    $scope.$on('flight-purchased', (event, vacation)=>{
      $scope.vacation = vacation;
      console.log('i am the show controller. here is my vacation', vacation);
    })

    $scope.findFlights = function(){
      Trip.findFlights($state.params.vacationId)
        .then(function(response){
          $scope.flights = response.data;
          console.log(response.data);
        });
    };
  }]);
