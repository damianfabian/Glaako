App.controller('MainCtrl', ['$scope', '$translate', '$rootScope','AuthFactory','$location','$state','localStorageService', function($scope, $translate, $rootScope, AuthFactory, $location, $state, localStorageService) {
      $scope.language = 'en';
      var remember = localStorageService.get('isLogin');
      $rootScope.isLogin = remember !== null ? remember : false;
      $rootScope.page = 'home';
      
      $scope.setLang = function(lang) {
        // You can change the language during runtime
        $scope.language = lang;
        $translate.use($scope.language);
        $state.reload();
      };
      
      $scope.active = function(){
        $rootScope.page = 'home';
      }
      
      $scope.search = function(){
        $location.path( "/word/"+$scope.filter );
      };
      
      $scope.logout = function(){
        AuthFactory.logout();
        $rootScope.isLogin = false;
        $state.go("index");
      }
      
}]);