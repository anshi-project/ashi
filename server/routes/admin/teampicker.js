var Registration = require("../../models/registration/main");
var Player = require("../../models/players/main");
var Team = require("../../models/team/team")

var _teams_ = require("../../locals/fields/enums").teams;

var teamsAppliedFor = _teams_.applyingFor;
var teamNames = _teams_.names;
//the teams listed on the registration form are slightly different than how they are labelled in the database.
//on the registration forms they are more general e.g. 'Womens Masters' can be Womens Team Red or Womens Team Blue

module.exports = function(app) {

    app.all("/admin/assign/player",function(req,res,next){
        // if(req.session.teamSeasons) return next()
        
        Team.find({}).select({archive:1,name:1})
            .exec(function(err,docs){
                var update = 0;
                var restore = 0;
                
                docs.forEach(doc => { 
                    if(doc.archive.canUpdate){
                        update++;
                    }else if(doc.archive.canRestore){
                        restore++;
                    }
                })      
                req.session.teamSeasons = (update + restore > 0)? docs : null;
               
                next();
        })
    })//check if any teams can update/restore their current season

    app.get("/admin/assign/player", function(req, res, next) {
        Registration.findRegisteredPlayers(function(err, player) {  
            if(err) return next({status:503})

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
                teams:teamNames,
                layout: "user",
                userType:"admin"
            })
        })
    })

    app.put("/admin/assign/player", function(req, res) {
        var id = req.query.id;

        Player.assignToTeam(id, req.body, function(err, doc) {
            if (err) return res.send(String(err));
            res.send(doc);
        })
    })//handles adding a returning player to a team;

    app.put("/admin/assign/manager", function(req, res) {
        var id = req.query.id;
        var divisions = req.body.division;
        var GM = require("../../models/staff/manager");
        
        GM.findByIdAndUpdate(id, req.body)
          .then(() =>{
            Team.update({division:{$in:divisions}},{$push:{managers:id}},{upsert:true,multi:true}).exec()
          })
          .then(()=>{ res.send("Successfully submitted GM to division")})
          .catch(err => {res.send(err).status(500)})
    })


    app.post("/admin/assign/:type", function(req, res) {
        var id = req.query.id;
        var team = req.body;
        var type = req.params.type;

        // res.send({id,team,type})
        Registration.assignToTeam(id, team, type, function(err, data) {      
            if(err) return res.send(err).status(500)
            res.send(data)
        })
    })

    app.put("/admin/new/season",function(req,res){
        var name = req.query.name;

        if(req.query.restore){
            Team.restore(name,function(err,success){
                if(err) return res.send(err);
                res.send(success)
            })
        }else{
            Team.createNewSeason(name,function(err,success){
                if(err) return res.send(err).status(500);
                res.send(success)            
            })
        }
    })

    app.put("/admin/archive-player",function(req,res){
        var id = req.query.id;
        Player.findByIdAndUpdate(id, {status:"archived"}, {upsert:true},
            function(err,doc){
                if(err) return res.send("Error").status(500)
                    res.send("Player was archived").status(200)
        })

    })//Returning players from previous seasons that get cut are 'archived' to instead of deleted from the database 
    //for the purposes of tracking stats

    app.delete("/admin/assign", function(req, res) {
        var id = req.query.id;

        Registration.findByIdAndRemove(id, function(err) {
            if (err) return res.status(500);
            res.send("Successfully deleted application.");
        })
    })
}
