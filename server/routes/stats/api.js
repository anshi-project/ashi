var Team = require("../../models/team/team");
var GameStats = require("../../models/team/game_stats");
var Player = require("../../models/players/main");
var parse=require("saymyname");

module.exports=function(app){    
    app.get("/api/playerstats", function(req, res){
        var query = {};
        if (req.param('teamname')) query['team.name'] = req.param('teamname');
        if (req.param('jerseynumber')) query['team.jersey_number'] = req.param('jerseynumber');
        console.log(query);
        Player.find(query, function(err, result){
            if (err){
                console.log(err);
            } else {
                res.json(result);
            }
        })
    });

    app.get("/api/player",function(req,res){
        // var q=req.query;
        // var query={firstname:q.firstname,lastname:q.lastname};
        // var options="";
        // Player.findOne(query, options,function(e,d){
        //     res.send(d);
        // })

    })

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