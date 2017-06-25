angular.module("skatestore")
.constant("dataUrl","http://localhost:2403/products")
.controller("skateStoreCtrl", function ($scope,$http,dataUrl) {

  $scope.data = { };

  $http.get(dataUrl)
    .then(function(response){
      $scope.data.products = response.data;
    },function(error){
      $scope.data.products = error;
    });
});
