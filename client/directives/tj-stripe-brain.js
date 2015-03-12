/* global StripeCheckout:true */

'use strict';

angular.module('angular-prototype')
.directive('tjStripeBrain', [function(){
  let o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/tj-stripe-brain.html';
  o.scope = {
    vacation:'=',
    cost: '=',
    title:'=',
    itinerary: '='
  };
  o.link = function(scope, element, attrs){};
  o.controller = ['$scope', 'Trip', ($scope, Trip)=>{

    let handler = StripeCheckout.configure({
      key: 'pk_test_SH0ZtWNgG1kyUpoiBQWg9Vos',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      token: function(token) {

        let info = {};
        info.token = token.id;
        info.cost = $scope.cost *100;
        info.description = $scope.title;
        info.itinerary = $scope.itinerary;
        console.log('&&&&&&&&&TOKEN', token);
        debugger;
        Trip.purchaseFlight($scope.vacation, info);

      }
    });

    $scope.purchase = function(){
      handler.open({
        name: 'Demo Site',
        description: $scope.title,
        amount: $scope.cost * 100
      });
    };
  }];

  return o
}]);
