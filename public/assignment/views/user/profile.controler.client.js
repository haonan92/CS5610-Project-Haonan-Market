/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $rootScope, UserService, $location) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.Removestuff = Removestuff;
        vm.follow = follow;
        vm.checkFollow = checkFollow;
        vm.removeFollowing = removeFollowing;
        vm.removeFollower = removeFollower;

        var currentUser = $rootScope.currentUser;





        function removeFollower(index) {
            UserService
                .removeFollower(index, currentUser)
                .success(function (response) {
                    init();
                })

        }



        function removeFollowing(index) {
            //console.log(index);
            UserService.removeFollowing(index, currentUser)
                .success(function (response) {
                    init();
                })
        }


        function checkFollow(person) {
            //console.log(person);
            UserService.checkFollow(person)
                .then(function (response) {
                    console.log(response);
                    var followUser = response.data;
                    $location.url("/user/"+ followUser._id);

                })
        }



        function follow(person) {
            //console.log(person);
            UserService.followUser(person, currentUser)
                .success(function (response) {
                    init();
                })
        }


        function Removestuff(index) {
            UserService
                .Removestuff(index, currentUser)
                .success(function (response) {
                    init();
                })

        }

        function init() {
            UserService.findUserById(userId)
                .then(function (response) {
                    vm.user= response.data;
                    //console.log(vm.user);
                })

            //return all users for the database page



        }
        init();


        function logout() {
            UserService.logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $location.url("/login")
                })
        }

        function deleteUser(currentUserId) {
            //console.log(currentUserId);
            UserService.deleteUser(currentUserId);
            init();
        }

        function updateUser() {
            UserService.updateUser(vm.user);
        }
    }
})();