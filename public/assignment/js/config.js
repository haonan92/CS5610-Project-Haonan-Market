/**
 * Created by Haonan on 10/12/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(Config);        //configure the module
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs: "model",
            })

            .when('/facebook', {
                templateUrl: 'views/user/facebook.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/user/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/user/:userId/edit", {
                templateUrl: "views/user/edit.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLogin: checkLogin
                }
            })

            .when("/detail/:itemId", {
                templateUrl: "views/detail/detail.view.client.html",
                controller:"DetailController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/home"
            }
            );

        function checkLogin($q, UserService, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user != '0') {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                        else {
                            $rootScope.currentUser = null;
                            alert( "You need to log in.");
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
        
    }
})();