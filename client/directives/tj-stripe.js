/* global StripeCheckout:true */

'use strict';

angular.module('angular-prototype')
.directive('tjStripe', [function(){
  let o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/tj-stripe.html';
  o.scope = {
    vacation:'=',
    cost: '=',
    title:'=',
    itinerary: '='
  };
  o.link = function(scope, element, attrs){};
  o.controller = ['$scope', '$rootScope', ($scope, $rootScope)=>{
      $scope.purchase = function(){
        let info = {
          vacation: $scope.vacation,
          cost: $scope.cost,
          description: $scope.title,
          itinerary: $scope.itinerary
        };

        $rootScope.$broadcast('purchase', info);
    };
  }];

  return o
}]);
