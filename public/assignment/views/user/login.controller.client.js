/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login (username,password) {
            var promise = UserService.login(username, password);
                promise
               .success(function (user) {
                    if(user === '0')
                    {
                        vm.error = "No such user";
                    }
                    else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (user) {
                    vm.error = "Please Check Your Username and Password";
                });


        }
    }
})();