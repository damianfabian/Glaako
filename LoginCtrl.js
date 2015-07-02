 App.controller('LoginCtrl', ['$scope','AuthFactory','$state','$rootScope', function($scope, AuthFactory, $state, $rootScope) {
  
  $rootScope.page = 'login';
  if($rootScope.isLogin === true)
    $state.go("index");
    
  $scope.message = '';
  
  $scope.login = function(){
    var user = {name:$scope.email, password:$scope.password};
    
    if(!AuthFactory.login(user)){
      $scope.message = 'Your credentilas are not in our database';
      return;
    } 
    $rootScope.isLogin = true;
    $state.go("catalog");
  } ;
  
  
}]);

 