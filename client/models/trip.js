'use strict';

angular.module('angular-prototype')
  .factory('Trip', ['$http', function($http){

    function findFlights(){
      return $http.get('/vacations/find');
    }

    return {findFlights:findFlights};
  }]);
