/**
 * Created by Haonan on 10/19/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = parseInt($routeParams.uid);
        vm.websiteId = parseInt($routeParams.wid);

        function  init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();

