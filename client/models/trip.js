'use strict';

angular.module('angular-prototype')
  .factory('Trip', ['$http', function($http){

    function findFlights(vacationId){
      return $http.get('/vacations/' + vacationId + '/flight');
    }

    return {findFlights:findFlights};
  }]);
