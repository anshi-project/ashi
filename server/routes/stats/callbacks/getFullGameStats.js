var GameStats = require("../../../models/team/game_stats");

function getFullGameStats (req, res){
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
    });
}
module.exports = getFullGameStats;
