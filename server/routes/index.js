
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
    
    app.get("/effe",function(req,res){
        Team.find({'name': 'U20'}).populate('games_stats').exec(function(err, data){
            res.send(data)
        });
    });
    
    app.post("/scorecard", function (req, res){
        var stats = req.body.data.stats;
        var ashiStats = stats.ashi_team_stats[0];
        var opponentStats = stats.opponent_stats[0];
        var ashiTeamName = stats.team_name;
        stats.home_game = stats.home_game === "true"? true: false;
        for (var property in ashiStats){
            if (ashiStats.hasOwnProperty(property)) {
              ashiStats[property] = Number(ashiStats[property]);
            }
        }
        for (var property in opponentStats){
            if (opponentStats.hasOwnProperty(property)) {
              opponentStats[property] = Number(opponentStats[property]);
            }
        }
        var gamesStats = new GameStats(stats);
        gamesStats.save(function(err, model) {
            var _id = model._id
            Team.findOneAndUpdate(
                {name: ashiTeamName},
                {$push: {"games_stats": _id}},
                function (err){console.log(err)}
            );
        });
        
        res.status(200).send();
    });
}

 