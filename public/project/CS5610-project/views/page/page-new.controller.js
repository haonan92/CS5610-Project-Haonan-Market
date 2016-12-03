/**
 * Created by Haonan on 10/20/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        vm.websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams.uid);
        vm.createPage = createPage;
        //svm.pages = PageService.findPageByWebsiteId(vm.websiteId);


        /*  After init I can not get websiteId and userId
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        return init;
        */

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = vm.websiteId;
            console.log(page);
            PageService.createPage(page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }

    }
})();

