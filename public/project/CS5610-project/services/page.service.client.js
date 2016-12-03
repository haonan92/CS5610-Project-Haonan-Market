(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "111", "name": "Post 1", "websiteId": 1000, "description": "Lorem1" },
            { "_id": "222", "name": "Post 2", "websiteId": 1000, "description": "Lorem2" },
            { "_id": "333", "name": "Post 3", "websiteId": 1000, "description": "Lorem3" },
            { "_id": "444", "name": "Post 4", "websiteId": 1000, "description": "Lorem4" },
            { "_id": "555", "name": "Post 5", "websiteId": 2000, "description": "Lorem5" },
            { "_id": "666", "name": "Post 6", "websiteId": 2000, "description": "Lorem6" },
            { "_id": "777", "name": "Post 7", "websiteId": 2000, "description": "Lorem7" },
            { "_id": "888", "name": "Post 8", "websiteId": 2000, "description": "Lorem8" },
            { "_id": "999", "name": "Post 9", "websiteId": 3000, "description": "Lorem9" },
            { "_id": "121", "name": "Post 10", "websiteId": 3000, "description": "Lorem10" },
            { "_id": "122", "name": "Post 11", "websiteId": 3000, "description": "Lorem11" },
            { "_id": "113", "name": "Post 12", "websiteId": 3000, "description": "Lorem12" }

        ];

        var api = {
            findPageByWebsiteId:findPageByWebsiteId,
            createPage:createPage,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };

        return api;

        function deletePage(pid) {
            for (var p in pages) {
                if(pages[p]._id === pid) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(page) {
            for (var p in pages) {
                if(pages[p]._id === page._id) {
                    pages[p] = page;
                }
            }
        }
        
        function findPageById(pid) {
            for(var p in pages) {
                if(parseInt(pages[p]._id) === pid) {
                    return pages[p];
                }
            }
            return null;
        }

        //function find pages by website Id
        function findPageByWebsiteId(wid) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId === wid) {
                    result.push(pages[p]);
                }
            }
            return result;
        }


        //fuction create new page
        function createPage(page) {
            pages.push(page);
        }



    }
})();