/**
 * Created by Haonan on 11/18/2016.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var StuffSchema = require("../stuff/stuff.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    //var StuffModel = mongoose.model("StuffModel, StuffSchema");

    var api = {
        createUser: createrUser,
        findUserById: findUserById,
        updateUser:updateUser,
        getAllUser: getAllUser,
        findUserByCredentials:findUserByCredentials,
        removeUser:removeUser,
        findUserByUsername:findUserByUsername,
        addToFavorite: addToFavorite,
        removefromList:removefromList,
        addToFriendList:addToFriendList,
        checkFollow:checkFollow,
        reomveFollowing:reomveFollowing,
        reomveFollower:reomveFollower,
        findFacebookUser:findFacebookUser,
        updateInfo:updateInfo

    }
    return api;

    function updateInfo(userId,user) {
        return UserModel
            .update(
                {
                    _id:userId
                },
                {
                    firstname:user.firstname,
                    lastname:user.lastname,
                    emailaddress:user.emailaddress
                }
            );
    }



    function findFacebookUser(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});

    }


    function reomveFollower(index, name) {
        return UserModel.findOne({ username: name }, function (err, user) {
            UserModel.findOne({ username: user.followers[index] }, function (err, user2) {
                user.followers.splice(index, 1);
                user.save();
                //get the index in follower by using user1 following
                user2.followings.splice(user.followers.indexOf(user.followers[index]), 1);
                user2.save();
            });

        });
    }


    function reomveFollowing(index, name) {
        return UserModel.findOne({ username: name }, function (err, user) {
            //get the username from user1 following
            UserModel.findOne({ username: user.followings[index]}, function (err, user2) {
                user.followings.splice(index, 1);
                user.save();
                //get the index in follower by using user1 following
                user2.followers.splice(user.followers.indexOf(user.followings[index]), 1);
                user2.save();
            });
        });
    }


    function checkFollow(person) {
        return UserModel.findOne({ username: person }, function (err, doc) {
            return
        });
    }

    function addToFriendList(uid, person) {
       return UserModel.findOne({ _id: uid }, function (err, user) {
            UserModel.findOne({ username: person }, function (err2, user2) {
                if (user.followings.indexOf(person) !== -1) {
                    return false;
                }

                if (user.username == person) {
                    return false;
                }

                if (user2) {
                    user.followings.push(person);
                    user.save();
                    user2.followers.push(user.username);
                    user2.save();
                    return;
                }
                else {
                    return false;
                }

            });
        });
    }

    function removefromList(index,uid) {
        return UserModel.findOne({_id: uid}, function (err, user) {
            console.log(user);
            user.stuffs.splice(index, 1);
            user.save();
        });
    }

    function addToFavorite(uid, stuff) {
        var stuff = {
            name: stuff.name,
            customerRating: stuff.customerRating,
            salePrice: stuff.salePrice,
            itemId: stuff.itemId,
            image:stuff.thumbnailImage
        }

        return UserModel.findOne({_id: uid}, function (err, user) {
            user.stuffs.push(stuff);
            user.save();
        });
    }



    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id:userId
                },
                {
                    firstname:user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
            );
    }

    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }

    function createrUser(user) {
        return UserModel.create(user);
    }

    function getAllUser() {
        return UserModel.find();
    }
};