(function () {
    angular
        .module("WebAppMaker")
        .controller("DetailController", DetailController);

    function DetailController($scope, $http, $routeParams, $rootScope, DetailService, CommentService, $location) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        vm.addToFavorites = addToFavorites;
        vm.removeStuff = removeStuff;
        vm.submitstuffComment = submitstuffComment;
        vm.removeComment = removeComment;
        vm.checkUser = checkUser;
        var itemId = $routeParams.itemId;



        // find the detail of the book using the id of that book
        $http.jsonp("http://api.walmartlabs.com/v1/search?query=" + itemId + "&format=json&apiKey=eeyyfwq5bbcynju7hdpyfnyj&callback=JSON_CALLBACK")
            .success(function (response) {
                vm.stuffs = response;
            });



        function checkUser(username) {
            //console.log(username);
            CommentService.checkFollow(username)
                .then(function (response) {
                    console.log(response);
                    var user = response.data;
                    $location.url("/user/"+ user._id);

                })
        }


        function submitstuffComment(username, itemId, comment) {
            CommentService.submitstuffComment(username, itemId, comment)
            init();

        }

        
        function removeComment(commentId) {
            //console.log(commentId);
            CommentService.removeComment(commentId);
            init();
        }
        

        function removeStuff(index) {
            $scope.addToProfile = false;
            $scope.removeFromProfile = true;
            $scope.feedBackMessage = "You have remove this item from you Wish List"
            $scope.isLike = false;

            DetailService
                .removeFromWishList(index, currentUser)
                .success(function (response) {
                    console.log("removed");
                });
        }

        function addToFavorites(stuff) {
            $scope.addToProfile = true;
            $scope.removeFromProfile = false;
            $scope.feedBackMessage = "You have successfully add this item to your Wish List"
            $scope.isLike = true;

            DetailService.addToFavorites(stuff, currentUser);
        };

        function init() {
            CommentService.findCommentsByItemId(itemId)
                .success(function (comments) {
                    if(comments != '[]') {
                        vm.comments = comments;
                        //console.log(vm.comments);
                    }
                })
                .error(function () {
                });
        }
        init();

    }

})();