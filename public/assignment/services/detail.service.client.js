/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("DetailService", DetailService);

    function DetailService($http) {

        var api = {
            addToFavorites:addToFavorites,
            removeFromWishList:removeFromWishList
        };
        return api;


        function removeFromWishList(index, user) {
            var url ="/api/removeFromWishList/" + user._id;
            return $http.delete(url, index);

        }

        function addToFavorites(stuff, user) {
            var url ="/api/addToFavorite/" + user._id;
            $http.put(url, stuff);
        }

    }
})();