
var Team = require("../models/team/team")
var GameStats = require("../models/team/game_stats")


module.exports=function(app){
    
    app.use("/",function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', 'https://ashi-ahstein3521.c9users.io');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        if(req.session.teamData){
            return next();
        }else{
            Team.find({})
                .populate("players goalies")
                .exec(function(e,d){
                        req.session.teamData=d;
                        next();
            })            
        }
    })//Adds all team data on the disk    
    
    app.get("/",function(req,res){
        res.render("index")
    })
    
    app.get("/players",function(req,res){
        res.send(req.session.teamData);
    });
    
    app.get("/scorecard",function(req,res){
        var teams=req.session.teamData.map(function(v){
            return v.division+": "+v.name;
        })
        res.render("scorecard",{teams:teams}); 
    })
    
   
    app.post("/scorecard", function (req, res){
        var stats = req.body.stats;
        new GameStats(stats).save(function(err, model){
            Team.update(
                {name: stats.team_name},
                {$push: {"games_stats": model._id}},
                function (err){console.log(err)}
            );
        });
        res.status(200).send();
    });
}

 