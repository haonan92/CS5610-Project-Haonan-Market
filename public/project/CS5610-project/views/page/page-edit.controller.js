/**
 * Created by Haonan on 10/19/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm.websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams.uid);
        vm.pageId = parseInt($routeParams.pid);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.findPageById = findPageById;
        vm.updatePage = updatePage;
        vm.deletePage =deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        return init();
        //svm.pages = PageService.findPageByWebsiteId(vm.websiteId);


        function deletePage(pid) {
            PageService.deletePage(pid);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }

        function updatePage(page) {
            PageService.updatePage(page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }


        function findPageById(pid) {
            PageService.findPageById(pid);
        }

    }
})();

