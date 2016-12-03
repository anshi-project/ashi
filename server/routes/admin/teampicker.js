var Registration = require("../../models/registration/main");
var Player = require("../../models/players/main");
var Team = require("../../models/team/team")

module.exports = function(app) {

    app.all("/admin/assign/*",function(req,res,next){
        if(req.session.teamSeasons) return next()
        
        Team.find({}).select({archive:1,name:1})
            .exec(function(err,docs){
                req.session.teamSeasons = docs;
                next();
        })
    })

    app.get("/admin/assign/player", function(req, res) {
        Registration.findRegisteredPlayers(function(player) {  
          // console.log(req.session.teamSeasons)          
            res.render("admin/teampicker/player", {
                player,
                teams: req.session.teamSeasons,
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
                teams:req.session.teamSeasons,
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

    app.put("/admin/new/season",function(req,res){
        var name = req.query.name;

        if(req.query.restore){
            Team.restore(name,function(err,docs){
                res.send(docs)
            })
        }else{
            Team.createNewSeason(name,function(err,docs){
                res.send(docs)            
            })
        }
    
    })

    app.delete("/admin/assign", function(req, res) {
        var id = req.query.id;

        Registration.findByIdAndRemove(id, function(err) {
            if (err) return res.status(500);
            res.send("Successfully deleted application.");
        })
    })
}