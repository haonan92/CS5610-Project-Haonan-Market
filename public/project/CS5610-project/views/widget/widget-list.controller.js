//Created by Haonan on 10/20/2016.

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeListController", WidgeListController);

    function WidgeListController($routeParams, WidgetService, $sce) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.wgid = parseInt($routeParams['wgid']);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;


        function inti() {
            vm.widgets = WidgetService.findWidgetsForPage(vm.pageId);
        }
        inti();


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }


        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

    }


})();