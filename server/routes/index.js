var Team = require("../models/team/team");
var GameStats = require("../models/team/game_stats");
var Player = require("../models/players/_default");
var storeScoreCardStats = require("./helpers/stats");

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
    });//Adds all team data on the disk    
    
    app.get("/",function(req,res){
        res.render("index")
    });
    
    app.get("/players",function(req,res){
        res.send(req.session.teamData);
    });
    
    app.get("/scorecard",function(req,res){
        var teams=req.session.teamData.map(function(v){
            return v.division+": "+v.name;
        })
        res.render("scorecard",{teams:teams}); 
    });
   
    app.post("/scorecard", function (req, res){
        var response = res;
        var stats = req.body.stats;
        storeScoreCardStats(stats, response);
    });
    
    app.get("/api/playerstats", function(req, res){
        var query = {};
        if (req.param('teamname')) query['team.name'] = req.param('teamname');
        if (req.param('jerseynumber')) query['team.jersey_number'] = req.param('jerseynumber');
        Player.find(query, function(err, result){
            if (err){
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });
    
    app.get("/api/teamstats", function(req, res){
        var query = {};
        if (req.param('teamname')) query['name'] = req.param('teamname');
        Team.find(query, function(err, result){
            if (err){
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });
    
    app.get("/api/fullgamestats", function(req, res){
        var query = {};
        if (req.param('teamname')) query['team_name'] = req.param('teamname');
        if (req.param('homegame')) query['home_game'] = req.param('homegame');
        if (req.param('opponent')) query['opponent'] = req.param('opponent');
        if (req.param('season')) query['season'] = req.param('season');
        GameStats.find(query, function(err, result){
            if (err){
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });
}

 