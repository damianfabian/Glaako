 App.controller('DetailCtrl', ['$scope','Dictionary','$stateParams','localStorageService', function($scope, dictionary, $stateParams,localStorageService) {
  dictionary.search($stateParams.id);
  $scope.word = localStorageService.get("current_result");
  $scope.tips = $scope.word.tips;
}]);

 