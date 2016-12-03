module.exports = function() {

    var connectionString = 'mongodb://localhost/Haonan-cs5610';
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);


    var userModel = require("./user/user.model.server.js")();
    var stuffModel = require("./stuff/stuff.model.server.js")();
    var commentModel = require("./comment/comment.model.server.js")();

    var model = {
        userModel: userModel,
        stuffModel:stuffModel,
        commentModel:commentModel
    };

    return model;
};