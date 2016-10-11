var Team = require("../../models/team/team");
var GameStats = require("../../models/team/game_stats");
var Player = require("../../models/players/_default");

function storeGameStats(stats){
    new GameStats(stats).save(function(err, model){
            Team.update(
                {name: stats.team_name},
                {$push: {"games_stats": model._id}},
                function (err){console.log(err)}
            );
        });
}

function storePlayerGameStats(s){
    Player.update({'team.name': s.team_name, 'team.jersey_number': s.jersey_number},
                    {$push: {game_stats: {season: s.season, team_name: s.team_name,
                     opponent: s.opponent, date: s.date, home_game: Boolean(s.home_game),
                     win: Boolean(s.win), G: s.G, A: s.A, P: s.P, PM: s.PM,
                     PIM: s.PIM, SOG: s.SOG, GWG: s.GWG, PP: s.PP, SH: s.SH}}},
                     function (err, model) {if (err) console.log('error', err)}
                    );
}

function updatePlayerSeasonStats(s){
    var update;
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    console.log('updatePlayerSeasonStats ', s, ' ', s.team_name);
    query = {'season_stats.season': s.season, 'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    
    Player.find(query, function(err, result){
        if (err){
            console.log(err);
            return;
        }
        if (result.length === 0){
            query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
            update = {$push: {season_stats: {season: s.season, team_name: s.team_name,
                      G: s.G, A: s.A, P: s.P, PM: s.PM, PIM: s.PIM, SOG: s.SOG, 
                      GWG: s.GWG, PP: s.PP, SH: s.SH, win: win, loss, loss}}}
            options = {setDefaultsOnInsert: true};
            Player.update(query, update, options, function(err){if (err){console.log(err)}});
        } else {
            query = {'season_stats.season': s.season, 'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
            update = {$inc: {'season_stats.$.G': s.G, 'season_stats.$.A': s.A, 'season_stats.$.P': s.P,
            'season_stats.$.PM': s.PM, 'season_stats.$.PIM': s.PIM, 'season_stats.$.SOG': s.SOG, 
            'season_stats.$.GWG': s.GWG, 'season_stats.$.PP': s.PP, 'season_stats.$.SH': s.SH,
            'season_stats.$.win': win, 'season_stats.$.loss': loss}};
            Player.update(query, update, function(err){if (err){console.log(err)}});
        }
    });
    
function updatePlayerCareerStats(s){
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    console.log('updateCareerStats ', s, ' ', s.team_name);
    var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    var update = {$inc: {G: s.G, A: s.A, P: s.P, PM: s.PM, PIM: s.PIM, SOG: s.SOG, 
              GWG: s.GWG, PP: s.PP, SH: s.SH, win: win, loss: loss}};
    Player.update(query, update, options, function(err){if (err){console.log(err)});
}   


module.exports = {
   storeGameStats: storeGameStats,
   storePlayerGameStats: storePlayerGameStats,
   updatePlayerSeasonStats: updatePlayerSeasonStats,
   updatePlayerCareerStats: updatePlayerCareerStats
}