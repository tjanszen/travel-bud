'use strict';

angular.module('angular-prototype')
  .controller('VacationsNewCtrl', ['$scope', 'Vacation', '$state', function($scope, Vacation, $state){
    $scope.submit = function(vacation){
    Vacation.create(vacation)
    .then(response=>{
      $state.go('vacations.show', {vacationId: response.data.vacation._id});
     });
   };
  }]);
