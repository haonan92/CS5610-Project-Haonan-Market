/**
 * Created by Haonan on 10/26/2016.
 */


module.exports = function (app,model) {

    app.put("/api/addToFavorite/:uid", addToFavorites);
    app.delete("/api/removeFromWishList/:uid", removeFromWishList);



    function removeFromWishList(req, res) {
        console.log("------------------removeFromWishList----------------------")
        var index = req.body;
        var uid = req.params.uid;
        console.log(index);
        model
            .userModel
            .removefromList(index,uid)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

    }


    function addToFavorites(req, res) {
        console.log("---------------from addToFavorites-----------------------");
        var stuff = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .addToFavorite(uid, stuff)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }




}