'use strict';

angular.module('angular-prototype')
  .factory('Trip', ['$http', function($http){

    function findFlights(vacationId){
      return $http.get('/vacations/' + vacationId + '/flight');
    }

    function purchaseFlight(vacationId, info){
      return $http.post('/vacations/' + vacationId + '/flights/purchase', info);
    }
    return {findFlights:findFlights, purchaseFlight:purchaseFlight};
  }]);
