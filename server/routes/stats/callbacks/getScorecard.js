var Team=require("../../../models/team/team")

function getScorecard (req,res){
    Team.find({},"players goalies name key")
        .populate({path:"players goalies",select:"firstname lastname team.jersey_number"})
        .exec(function(e,d){
            req.session.teamData=d;
            res.render("scorecard"); 
        });
}

module.exports = getScorecard;