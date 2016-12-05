/**
 * Created by Haonan on 10/17/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser:createUser,
            findUserByUsername:findUserByUsername,
            allUsers:allUsers,
            updateUser:updateUser,
            deleteUser:deleteUser,
            login: login,
            checkLogin:checkLogin,
            logout:logout,
            Removestuff:Removestuff,
            followUser:followUser,
            checkFollow:checkFollow,
            removeFollowing:removeFollowing,
            removeFollower:removeFollower,
            register:register,
            editInfo:editInfo

        };
        return api;


        function editInfo(person) {
            return $http.put('/api/editInfo/'+ person._id, person);

        }

        function register(username, password) {
            var newuser = {
                username:username,
                password:password,
            }
            return $http.post('/api/register', newuser);
        }


        function removeFollower(index, user) {
            return $http.delete('/api/reomveFollower/'+ user.username + '/' + index);
        }


        function removeFollowing(index, user) {
            //console.log(index);
            //console.log(user);
            return $http.delete('/api/reomveFollowing/' + user.username + '/' + index);
        }

        function checkFollow(person) {
            return $http.get('/api/checkfollow/'+ person);
        }

        function followUser(person, currentUser) {
            //console.log(person);
            //console.log(currentUser);
            return $http.post('/api/followUser/'+currentUser._id + '/'+ person);

        }


        function Removestuff(index, user) {
            return $http.delete('/api/removeStuff/' + user._id + '/' + index)
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }


        function allUsers() {
            var url = '/api/users/alluser';
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function createUser(user) {
            var newuser = {
                username:user.username,
                password:user.password,
                password2:user.password2
            }
            return $http.post('/api/user', newuser);
            //users.push(user);
        }


        function findUserById(userId) {
            var url = '/api/user/'+userId;
            return $http.get(url);
        }


        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }


        function deleteUser(uid) {
            var url ="/api/user/" + uid;
            $http.delete(url);
        }

        function updateUser(user) {
            var url ="/api/user/" + user._id;
            $http.put(url, user);
        }

    }
})();