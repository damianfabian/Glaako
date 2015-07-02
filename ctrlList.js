App.controller('ctrlList', ['$scope','Dictionary','localStorageService','$translate','$rootScope', function($scope, dictionary, localStorageService,$translate,$rootScope) {
    $rootScope.page = 'words';
    var lang =  $translate.use();
    dictionary.all(lang);
    $scope.words = localStorageService.get("current_result");
}]);