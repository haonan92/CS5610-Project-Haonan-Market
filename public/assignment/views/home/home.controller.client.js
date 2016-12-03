/**
 * Created by Haonan on 11/29/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("HomeController", HomeController);

    function HomeController($scope, $http, $rootScope) {
        var vm = this;
        vm.searchTitle = searchTitle;
        var currentUser = $rootScope.currentUser;

        function searchTitle() {
            //alert("dd");
            $http.jsonp("http://api.walmartlabs.com/v1/search?query=" + $scope.titleSearch + "&format=json&apiKey=eeyyfwq5bbcynju7hdpyfnyj&callback=JSON_CALLBACK")
                .success(function (response) {
                    console.log(response);
                    vm.stuffs = response;
                });
        }
    }

})();