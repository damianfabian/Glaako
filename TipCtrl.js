 App.controller('TipCtrl', ['$scope','localStorageService', function($scope, localStorageService) {
  $scope.word = localStorageService.get("current_result");
  $scope.tips = $scope.word.tips;
}]);

 