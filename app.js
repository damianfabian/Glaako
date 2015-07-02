var App = angular.module('myapp', ["ui.router","pascalprecht.translate","LocalStorageModule"])
    App.config(function($stateProvider, $translateProvider,localStorageServiceProvider,$urlRouterProvider){
    
    $urlRouterProvider.otherwise("index");
    
    var authenticated = ['$q', 'AuthFactory', function ($q, AuthFactory) {
      var deferred = $q.defer();
      AuthFactory.isLoggedIn(false)
        .then(function (isLoggedIn) {
          if (isLoggedIn) {
            deferred.resolve();
          } else {
            deferred.reject('Not logged in');
          }
        });
      return deferred.promise;
    }];
      
    $stateProvider
        .state('index', {
            url: "",
            views: {
                "viewA": {
                    templateUrl: 'home.content.part.htm'
                },
                "mainView":{
                  templateUrl: "home.intro.part.htm"
                },
                "viewB": {
                    templateUrl: 'home.content.2.part.htm'
                }
            }
            
        })
        .state('word', {
            url: "/word/:id",
            
            views: {
                "viewA": {
                    templateUrl: 'detail.part.htm',
                    controller: "DetailCtrl"
                },
                "viewB": {
                    templateUrl: 'detail.tip.part.htm',
                    controller: "TipCtrl"
                }
            },
            resolve: {
              authenticated: authenticated
            }

        })
        .state('catalog', {
            url: "/catalog",
            views: {
                "mainView": {
                    templateUrl: 'list.part.htm',
                    controller: "ctrlList"
                }
                
            },
            resolve: {
              authenticated: authenticated
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "mainView": {
                    templateUrl: "login.part.htm",
                    controller: "LoginCtrl"
                }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "mainView": {
                    templateUrl: "register.part.htm",
                    controller: "RegisterCtrl"
                }
            }
        });
        
    $translateProvider
            .useStaticFilesLoader({
                prefix: '',
                suffix: '.json'
            })
            .preferredLanguage('en')
            .fallbackLanguage(['es'])
            .useSanitizeValueStrategy(null);
            
    localStorageServiceProvider
      .setPrefix('Idioms')
      .setStorageType('sessionStorage')
      .setNotify(true, true)
    
    })
    .run(function ($rootScope, $state) {
      $rootScope.$on('$stateChangeError', function (err, req) {
        $state.go('login');
      });
    });
    