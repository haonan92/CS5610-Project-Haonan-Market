(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService,$location) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams['uid']);
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);

        }
        init();


        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/"+ vm.userId +"/website");

        }

        function removeWebsite(wid) {
            WebsiteService.removeWebsite(wid);
            $location.url("/user/"+ vm.userId +"/website");

        }
        
    }
})();