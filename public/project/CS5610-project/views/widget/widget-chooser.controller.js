//Created by Haonan on 10/20/2016.

(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgeChooserController", WidgeChooserController);

    function WidgeChooserController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.wigetId = parseInt($routeParams['wgid']);


        vm.createWidget = createWidget;


        function inti() {
            vm.widget = WidgetService.findWidgetbyId(vm.wigetId);
        }

        inti();

        function createWidget(pid, widget) {
            if(widget.widgetType == 'HEADER' && widget.size == null) {
                widget.size = 2;
            }
            console.log("d");
            var newWidget = WidgetService.createWidget(pid, widget);
            console.log(newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);

        }
    }
})();