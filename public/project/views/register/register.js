app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope) {
    //register method
    $scope.register = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
         //alert("Your passwords don't match");
            $scope.errorMessage = 'Your passwords do not match';
            $scope.show = true;
            $scope.userNameExits = false;

            return;
      
        }
        else {
            $http.post("/register", user)
            .success(function (response) {
                if (response == "user already exists") {
                   // alert("user already exists!!");
                    $scope.show = false;
                    $scope.errorMessage = 'Username already exists!!';
                    $scope.userNameExits = true;

                }
                if (response != null && response != "user already exists") {
                    $rootScope.currentUser = response;
                    console.log($rootScope.currentUser);
                    $location.url("/profile");
                  
                }
            });
        }
    }













});

