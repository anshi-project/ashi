var Team=require("../../../models/team/team")

function getScorecard (req,res){
    Team.find({},"players name key")
        .populate({
        	path:"players",
        	sort:{"team.jersey_number":1},
        	select:"firstname lastname team.jersey_number",
        	match:{status:"Active"}})
        .exec(function(e,docs){
            req.session.teamData = docs;
            res.render("scorecard",{layout:"scorecard"}); 
        });
}

module.exports = getScorecard;