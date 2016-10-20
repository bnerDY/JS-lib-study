angular.module('app', [])
.controller('NewUserCtr',['$scope', function($scope) {
  $scope.save = function() {
    if ($scope.userForm.$invalid) {
      alert("You must validate the form");
    } else {
      alert("Add user");
      $scope.reset();
    }
  };

  $scope.reset = function() {
    $scope.user = {name:"", email:""};
  };
}]);




                