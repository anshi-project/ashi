var Player = require("../../../models/players/main");

function getPlayerStats (req, res){
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
}

module.exports = getPlayerStats;