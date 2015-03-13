/* global StripeCheckout:true */

'use strict';

angular.module('angular-prototype')
.directive('tjStripeBrain', [function(){
  let o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/tj-stripe-brain.html';
  o.scope = {};
  o.controller = ['$rootScope', '$scope', 'Trip', ($rootScope, $scope, Trip)=>{
    let data;
    let handler = StripeCheckout.configure({
      key: 'pk_test_SH0ZtWNgG1kyUpoiBQWg9Vos',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      token: function(token) {
        data.token = token.id;
        Trip.purchaseFlight(data.vacation, data)
        .then(response=>{
          $rootScope.$broadcast('flight-purchased', response.data);
        });
      }
    });

    $scope.$on('purchase', (event, info)=>{
      data = info;
      handler.open({
        name: 'Travel Eddie',
        description: $scope.description,
        amount: $scope.cost
      });
    });
  }];

  return o
}]);
