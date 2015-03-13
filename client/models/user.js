'use strict';

angular.module('angular-prototype')
  .factory('User', ['$http', function($http){

    function updateUser(user){
      console.log(user)
      return $http.post('/profile', user);
    }
    return {updateUser:updateUser};
  }]);
