
var Team = require("../models/team/team");
var GameStats = require("../models/team/game_stats");
var Player = require("../models/players/_default");
var team_name;

function storePlayerGameStats(s){
    console.log('storestat called ', s, ' ', team_name);
    Player.update({'team.name': team_name, 'team.jersey_number': s.jersey_number},
                    {$push: {game_stats: {season: +s.season, team_name: team_name,
                     date: s.date, home_game: Boolean(s.home_game), win: Boolean(s.win), G: +s.G,
                     A: +s.A, P: +s.P, PM: +s.PM, PIM: +s.PIM, SOG: +s.SOG, GWG: +s.GWG,
                     PP: +s.PP, SH: +s.SH}}},
                     function (err, model) {if (err) console.log('error', err)}
                    );
}

function storeGoalieGameStats(s){
    console.log('storestat called ', s, ' ', team_name);
    Player.update({'team.name': team_name, 'team.jersey_number': s.jersey_number},
                    {$push: {game_stats: {season: +s.season, team_name: team_name,
                     date: s.date, home_game: Boolean(s.home_game), win: Boolean(s.win), G: +s.G,
                     A: +s.A, P: +s.P, PM: +s.PM, PIM: +s.PIM, SOG: +s.SOG, GWG: +s.GWG,
                     PP: +s.PP, SH: +s.SH}}},
                     function (err, model) {if (err) console.log('error', err)}
                    );
}

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
        team_name = stats.team_name; 
        // console.log(team_name, " ", stats);
        new GameStats(stats).save(function(err, model){
            Team.update(
                {name: stats.team_name},
                {$push: {"games_stats": model._id}},
                function (err){console.log(err)}
            );
        });
        
        stats.ashi_players.map(storePlayerGameStats);
        
        res.status(200).send();
    });
}

 