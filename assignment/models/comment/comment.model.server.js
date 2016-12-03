/**
 * Created by Haonan on 11/18/2016.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var CommentStuffSchema = require("./comment.schema.server")();
    var CommentModel = mongoose.model("CommentModel", CommentStuffSchema);


    var api = {
        submitstuffComment:submitstuffComment,
        findCommentsByItemId:findCommentsByItemId,
        removeComment:removeComment
    }
    return api;

    
    function removeComment(commentId) {
        return CommentModel
            .remove({
                _id: commentId
            })
    }

    
    function findCommentsByItemId(itemId) {
        return CommentModel
            .find({
                stuffId: itemId
            });
    }

    
    function submitstuffComment(name, itemId, comment) {
        var newComment = new CommentModel({
            username: name,
            stuffId: itemId,
            comment: comment
        });
        newComment.save();
        return newComment;
    }
};