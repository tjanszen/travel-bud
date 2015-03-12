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
  o.controller = ['$scope', ($scope)=>{
      $scope.purchase = function(){
        
    };
  }];

  return o
}]);
