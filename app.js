var express = require('express'),
    _ = require("underscore");

module.exports = {
    "title": "Statement",
    "name": "statement",
    "app": function membership (config, db, site) {
        var app = express();
        _.extend(app.locals, site.locals);
        
        app.set('views', __dirname + "/views");
        
        site.use("/static", express.static(__dirname + "/" + config.static_dir));
        
        app.get('/', function index (req, res) {
            var user = res.locals.user;
            if (user) {
                user.historic_events(function (err, events) {
                    if (!err) {
                        res.render("statement", { "now": new Date(), "events": events});
                    }
                    else {
                        res.locals.flash("danger", "Database Error.", "Very sorry but there appears to be a problem with the database.");
                        res.redirect("/");
                    }
                });
            }
            else {
                res.locals.flash("warning", "Invalid member.", "Please sign in.");
                res.redirect("/");
            }
        });
        
        return app;
    }
}

