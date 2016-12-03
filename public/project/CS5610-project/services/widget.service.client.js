/**
 * Created by Haonan on 10/20/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": 555, "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": 555, "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": 555, "width": 100,
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": 555, "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": 555, "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": 555, "width": 100,
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": 555, "text": "<p>Lorem ipsum</p>"},


            { "_id": "123", "widgetType": "HEADER", "pageId": 666, "size": 2, "text": "Supreme"},
            { "_id": "234", "widgetType": "HEADER", "pageId": 666, "size": 4, "text": "Supreme Sold Out"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": 666, "width": 100,
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": 666, "text": "<p>Supreme</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": 666, "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": 666, "width": 100,
                "url": "https://youtu.be/PbsTo_JsoD0" },
            { "_id": "789", "widgetType": "HTML", "pageId": 666, "text": "<p>Supreme</p>"}


        ];

        var api = {
            findWidgetsForPage:findWidgetsForPage,
            findWidgetbyId:findWidgetbyId,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        }
        return api;

        function deleteWidget(wgid) {
            for (var w in widgets) {
                if(widgets[w]._id === wgid) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widget._id) {
                    widgets[w] = widget;
                    return widget;
                }
            }
            return null;
        }


        function createWidget(pid, widget) {

            widget._id = (new Date()).getTime().toString();
            widget.pageId = pid;
            widgets.push(widget);
            return widget;
        }


        function findWidgetsForPage(pid) {
            var result = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pid) {
                    result.push(widgets[w]);
                }
            }
            return result;
        }


        function findWidgetbyId(wid) {
            for(var w in widgets) {
                if(widgets[w]._id == wid) {
                    return widgets[w];
                }
            }
            return null;
        }
    }
})();