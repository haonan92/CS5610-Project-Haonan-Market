/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {
            submitstuffComment:submitstuffComment,
            findCommentsByItemId:findCommentsByItemId,
            removeComment:removeComment,
            checkFollow:checkFollow
        };
        return api;

        
        function checkFollow(username) {
            return $http.get("/api/goToUserPage/"+username);

        }
        
        

        function removeComment(commentId) {
            return $http.delete("/api/removeComment/"+commentId);
        }


        function findCommentsByItemId(itemId) {
            return $http.get("/api/findCommentsByItemId/"+itemId);
        }


        function submitstuffComment(username, itemId, comment) {
            return $http.post("/api/submitstuffComment/" + username + '/' + itemId + '/' + comment);

        }

    }
})();