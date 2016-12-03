/**
 * Created by Haonan on 11/18/2016.
 */
module.exports = function() {
    var mongoose = require("mongoose");
    var StuffSchema = require("./stuff.schema.server")();
    var StuffModel = mongoose.model("StuffModel", StuffSchema);


};