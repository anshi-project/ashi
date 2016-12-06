var Registration = require("../../models/registration/main");
var Player = require("../../models/players/main");
var Team = require("../../models/team/team")

var teamsAppliedFor = require("../../locals/fields/enums").teams.applyingFor;
//the teams listed on the registration form are slightly different than how they are labelled in the database.
//on the registration forms they are more general e.g. 'Womens Masters' can be Womens Team Red or Womens Team Blue

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
                teams2:teamsAppliedFor,
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


    app.get("/seed",function(req,res){
        var Registration = require("../../models/registration/_playerReg")
        var seed = require("../../locals/seed")(req.query.name)
        
        var reg = new Registration(seed);
        reg.save(function(err,doc){
            if(err) console.error(String(err));
            res.send(doc)
        })   
        
    })

    app.post("/admin/assign/:type", function(req, res) {
        var id = req.query.id;
        var team = req.body;
        var type = req.params.type;

        Registration.assignToTeam(id, team, type, function(err, data) {
            if(err) return res.send(err).status(500)
            res.send(data).status(200);
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

    app.put("/admin/archive-player",function(req,res){
        var id = req.query.id;
        Player.findByIdAndUpdate(id, {status:"archived"}, {upsert:true,new:true},
            function(err,doc){
                if(err) return res.send("Error").status(500)
                    res.send("Player was archived").status(200)
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
