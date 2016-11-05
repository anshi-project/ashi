var Team=require("../../../models/team/team");

function getTeamStats(req, res){
    var query = {};
    if (req.param('teamname')) query['name'] = req.param('teamname');
    Team.find(query, function(err, result){
        if (err){
            console.log(err);
        } else {
            res.json(result);
        }
    })
}

module.exports = getTeamStats;