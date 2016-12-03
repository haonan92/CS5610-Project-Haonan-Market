/**
 * Created by Haonan on 10/25/2016.
 */

// create a node js module
module.exports = function (app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app, model);
    require("./services/detail.service.server.js")(app, model);
    require("./services/comment.service.server")(app, model);

};