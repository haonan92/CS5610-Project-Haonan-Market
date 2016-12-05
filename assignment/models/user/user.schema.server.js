/**
 * Created by Haonan on 11/18/2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var StuffSchema = require("../stuff/stuff.schema.server")(mongoose);

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        emailaddress: String,
            facebook: {
                id:    String,
                token: String,
                displayName: String
            },
        stuffs: [StuffSchema],
        followings: [String],
        followers: [String]
    },
        {collection: "user"});
    return UserSchema;
}