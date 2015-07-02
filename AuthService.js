/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  App.factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$http', '$state', '$q','localStorageService'];

  function AuthFactory($http, $state, $q,localStorageService) {
    
    var factory = {
      userId: null,
      // userName: null,
      isLogin: false,
      isLoggedIn: isLoggedIn,
      getUserName: getUserName,
      login: login,
      logout: logout,
      then: callFunc
    };
    
    return factory;
    
    function callFunc(fx){ 
      
      fx.call(null,factory.isLogin);
      
    }
    
    function login(user){
      if(user.name === 'a@a.com' && user.password === 'a')
      {
          localStorageService.set('isLogin', true);
          return true;
      }
        
      return false;  
    }
    
    function logout(){
     
      localStorageService.set('isLogin', false);
      return true;
     
    }
    
    function isLoggedIn(redirectToLogin) {
      factory.isLogin = localStorageService.get('isLogin');
      return factory;
      /*return $http.get('/auth/user')
        .then(function (res) {
          factory.userId = res.data.userId;
          factory.userName = res.data.userName;
          factory.githubAvatarUrl = res.data.githubAvatarUrl;
          if (res.data.userId === null) {
            if (redirectToLogin !== false) {
              return $state.go('login');
            }
            return false;
          }
          return {
            'userName': factory.userName,
            'userId': factory.userId,
            'githubAvatarUrl': factory.githubAvatarUrl,
          };
        });*/
    }

    function getUserName() {
      if (factory.userName === undefined) {
        return factory.isLoggedIn();
      } else {
        return $q.when({
          'userName': factory.userName,
          'userId': factory.userId,
          'githubAvatarUrl': factory.githubAvatarUrl
        });
      }
    }

  }

})();