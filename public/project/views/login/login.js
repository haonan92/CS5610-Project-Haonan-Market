app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope) {
    $scope.login = function (user) {
        $http.post("/login", user)
        .success(function (response) {
            $rootScope.currentUser = response;
            $location.url("/profile/" + user.username);
        })
        .error(function (error) {
            $scope.show = true;
            $scope.errorMessage = 'Unauthorized, Please check your username or password!';
        });
    };
});