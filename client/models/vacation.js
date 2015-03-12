'use strict';

angular.module('angular-prototype')
  .factory('Vacation', ['$http', function($http){

    function create(vacation){
      return $http.post('/vacations', vacation);
    }

    function show(vacationId){
      return $http.get('/vacations/' + vacationId);
    }

    function list(){
      return $http.get('/vacations');
    }

    return {create:create, show:show, list:list};
  }]);
