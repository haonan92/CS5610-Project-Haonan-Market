/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, UserService) {
        var vm = this;

        //triple = does not work on my pc
        //var userId = parseInt($routeParams.uid);
        var userId = $routeParams.uid;
        var user = UserService.findUserById(userId);
        vm.updateUser = updateUser;
        vm.users = UserService.allUsers();
        vm.deleteUser = deleteUser;

        if(user != null) {
            vm.user = user;
        }


        function deleteUser(uid) {
            UserService.deleteUser(uid);
        }

        function updateUser(currentuser) {
            currentuser = vm.user;
            UserService.updateUser(user);
            console.log(currentuser);
            vm.success = "You have updated user!! Email:"+currentuser.emailaddress + "     Firstname: "+currentuser.first +"     Lastame:"+currentuser.last;
        }

    }
})();