/**
 * Created by Haonan on 10/26/2016.
 */

module.exports = function (app,model) {


    app.post("/api/submitstuffComment/:username/:itemId/:comment",submitstuffComment);
    app.get("/api/findCommentsByItemId/:itemId",findCommentsByItemId);
    app.delete("/api/removeComment/:commentId",removeComment);
    app.get("/api/goToUserPage/:username" , checkfollowFromDetailPage);

    function checkfollowFromDetailPage(req, res) {
        console.log("-----------------checkfollowFromDetailPage--------------------")
        var username = req.params.username;
        model
            .userModel
            .checkFollow(username)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function removeComment(req, res) {
    console.log("----------------removeComment-------------------");
        var commentId = req.params.commentId;
        model
            .commentModel
            .removeComment(commentId)
            .then(
                function(status){
                    console.log("removed comments");
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );


    }


    function findCommentsByItemId(req, res) {
        console.log("----------findCommentsByItemId---------------------");
        var itemId = req.params.itemId;
        model
            .commentModel
            .findCommentsByItemId(itemId)
            .then(
                function (comments) {
                    if(comments) {
                        //console.log(comments);
                        res.json(comments);
                    }
                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function submitstuffComment(req, res) {
        var name = req.params.username;
        var itemId = req.params.itemId;
        var comment = req.params.comment;
        model
            .commentModel
            .submitstuffComment(name, itemId, comment)
    }





}