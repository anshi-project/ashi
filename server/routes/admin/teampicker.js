var Registration = require("../../models/registration/main");
var Player = require("../../models/players/main");

module.exports = function(app) {

    app.get("/admin/assign/player", function(req, res) {
        Registration.findRegisteredPlayers(function(player) {            
            res.render("admin/teampicker/player", {
                player,
                teams:require("../../locals/fields/teams").names,
                layout: "user",
                userType:"admin"
            });
        })
    })

    app.get("/admin/assign/coach", function(req, res) {
        var Coaches = require("../../models/registration/_coachReg");
        Coaches.find({}, function(err, coach) {
            if (err) throw err;
            res.render("admin/teampicker/coach", {
                coach,
                layout: "user",
                userType:"admin"
            })
        })
    })

    app.put("/admin/assign/player", function(req, res) {
        var id = req.query.id;

        Player.assignToTeam(id, req.body, function(err, doc) {
            if (err) throw err;
            res.send(doc);
        })
    })//handles adding a returning player to a team;

    app.put("/admin/assign/manager", function(req, res) {
        var id = req.query.id;
        var division = req.body.division;
        var GM = require("../../models/staff/manager");
        GM.assign(id, division)
        res.send(id + " assigned");
    })

    app.post("/admin/assign/coach", function(req, res) {
        var id = req.query.id;
        var team = req.body;

        Registration.assignCoach(id, team, function(err) {
            if (err) throw err;
            res.send("Successfully added")
        });

    })

    app.post("/admin/assign/player", function(req, res) {
        var id = req.query.id;
        var team = req.body;
        var flag = (team.position == "Goalie");

        Registration.assignPlayer(id, team, flag, function(data) {
            res.send(data);
        })
    })

    app.delete("/admin/assign", function(req, res) {
        var id = req.query.id;

        Registration.findByIdAndRemove(id, function(err) {
            if (err) return res.status(500);
            res.send("Successfully deleted application.");
        })
    })
}