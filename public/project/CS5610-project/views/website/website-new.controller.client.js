/**
 * Created by Haonan on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        //why wid
        var websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams['uid']);
        vm.createWebsite = createWebsite;


        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.uid = vm.userId;
            WebsiteService.createWebsite(website);
            console.log(website);

            //function to reupdate the list left hand side
            vm.websites= WebsiteService.findWebsitesForUser(vm.userId);
            $location.url("/user/"+ vm.userId +"/website");
        }

    }
})();