(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: 1000, name: 'facebook.com', uid: 111},
            {_id: 2000, name: 'wikipedia.org', uid: 222},
            {_id: 3000, name: 'twitter.com', uid: 222}
        ];

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite:updateWebsite,
            removeWebsite:removeWebsite
        };
        return api;


        function createWebsite(website) {
            websites.push(website);
        }

        function findWebsiteById(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function findWebsitesForUser(uid) {
            var result = [];
            for(var w in websites) {
                if(websites[w].uid === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }
        function removeWebsite(wid) {
            for (var w in websites) {
                if(websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }
        
        function updateWebsite(website) {
            for (var w in websites) {
                if(websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }

    }
})();