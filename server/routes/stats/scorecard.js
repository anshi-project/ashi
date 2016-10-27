var Team = require("../../models/team/team");
var storeScoreCardStats = require("../helpers/stats");

module.exports=function(app){
   
    
    app.get("/players",function(req,res){
        res.send(req.session.teamData);
    });
    
    app.get("/scorecard",function(req,res){
            Team.find({},"players goalies name key")
                .populate({path:"players goalies",select:"firstname lastname team.jersey_number"})
                .exec(function(e,d){
                    req.session.teamData=d;
        res.render("scorecard"); 
    });
    })
   
    app.post("/scorecard", function (req, res){
        var response = res;
        var stats = req.body.stats;
        storeScoreCardStats(stats, response);
    });
    
}

 