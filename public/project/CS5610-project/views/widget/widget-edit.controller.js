//Created by Haonan on 10/20/2016.

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeEditController", WidgeEditController);

    function WidgeEditController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.wigetId = parseInt($routeParams['wgid']);
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;


        function inti() {
            vm.widget = WidgetService.findWidgetbyId(vm.wigetId);
            vm.widgets = WidgetService.findWidgetsForPage(vm.pageId);
            vm.wigtype = vm.widget.widgetType.toLowerCase();

        }

        inti();


        function deleteWidget(wgid) {
            wgid = vm.widget._id;
            WidgetService.deleteWidget(wgid);
            alert("This Widget has been removed, click back to widget list")
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }

        function updateWidget(widget) {
            widget = vm.widget;
            var updated = WidgetService.updateWidget(widget);
            console.log(updated);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }


    }
})();