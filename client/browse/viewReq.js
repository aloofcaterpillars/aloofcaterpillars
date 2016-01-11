angular.module('viewReq', [])

.controller('viewCtrl', function($scope, Meals) {
  //TODO: we need to figure out current user and pass that in the get request
  $scope.user
  $scope.pending = [];

  console.log('Controller for View loading')
  
  Meals.pendingReq('Bob').then(function(data) {
    $scope.pending = data  
  })

})