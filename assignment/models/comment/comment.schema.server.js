
module.exports = function () {
    var mongoose = require("mongoose");
    var CommentStuffSchema = new mongoose.Schema({
        username: String,
        stuffId: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    },
        {collection: "comment"});
    return CommentStuffSchema;
}