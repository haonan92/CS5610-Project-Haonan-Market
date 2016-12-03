/**
 * Created by Haonan on 11/18/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var StuffSchema = mongoose.Schema({
            name: String,
            itemId: Number,
            customerRating: String,
            salePrice: String,
            image:String
        },
        {collection: "stuff"});
    return StuffSchema;
}