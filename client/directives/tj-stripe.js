angular.module('angular-prototype')
  .directive('tjStripe', [function(){
    let o = {};

    o.restrict = 'A';
    o.templateUrl = '/directives/tj-stripe.html';
    o.scope = {};
    o.link = function(scope, element, attrs){};
    o.controller = ['$scope', ($scope)=>{
      $scope.x = 3;
    }]

    return o
  }])
