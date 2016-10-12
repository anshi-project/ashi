var Team = require("../../models/team/team");
var GameStats = require("../../models/team/game_stats");
var Player = require("../../models/players/_default");
var Goalie = require("../../models/players/_goalie");
var callback = function (err) {if (err) {console.log('error: ', err)}};

function storeGameStats(stats){
    new GameStats(stats).save(function(err, model){
        var query = {name: stats.team_name};
        var update = {$push: {"games_stats": model._id}};
        Team.update(query, update, callback);
    });
}

function storePlayerGameStats(s){
    var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    var update = {$push: {game_stats: {season: s.season, team_name: s.team_name, 
                     opponent: s.opponent, date: s.date, home_game: Boolean(s.home_game),
                     win: Boolean(s.win), G: s.G, A: s.A, P: s.P, PM: s.PM,
                     PIM: s.PIM, SOG: s.SOG, GWG: s.GWG, PP: s.PP, SH: s.SH}}};
    Player.update(query, update, callback);
}

function updatePlayerSeasonStats(s){
    var update;
    win = Boolean(s.win)? 1: 0;
    loss = Boolean(s.win)? 0: 1;
    console.log('updatePlayerSeasonStats ', s, ' ', s.team_name);
    var query = {'season_stats.season': s.season, 'team.name': s.team_name,
                 'team.jersey_number': s.jersey_number};
    
    Player.find(query, function(err, result){
        if (err){
            console.log(err);
            return;
        }
        if (result.length === 0){
            query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
            update = {$push: {season_stats: {season: s.season, team_name: s.team_name,
                      G: s.G, A: s.A, P: s.P, PM: s.PM, PIM: s.PIM, SOG: s.SOG, 
                      GWG: s.GWG, PP: s.PP, SH: s.SH, win: win, loss: loss}}}
            options = {setDefaultsOnInsert: true};
            Player.update(query, update, options, callback);
        } else {
            query = {'season_stats.season': s.season, 'team.name': s.team_name,
                     'team.jersey_number': s.jersey_number};
            update = {$inc: {'season_stats.$.G': s.G, 'season_stats.$.A': s.A,
                             'season_stats.$.P': s.P, 'season_stats.$.PM': s.PM,
                             'season_stats.$.PIM': s.PIM, 'season_stats.$.SOG': s.SOG, 
                             'season_stats.$.GWG': s.GWG, 'season_stats.$.PP': s.PP,
                             'season_stats.$.SH': s.SH, 'season_stats.$.win': win,
                             'season_stats.$.loss': loss}};
            Player.update(query, update, callback);
        }
    });
}
    
function updatePlayerCareerStats(s){
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    // console.log('updateCareerStats ', s, ' ', s.team_name);
    var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    var update = {$inc: {'career_stats.G': s.G, 'career_stats.A': s.A, 
                         'career_stats.P': s.P, 'career_stats.PM': s.PM, 
                         'career_stats.PIM': s.PIM, 'career_stats.SOG': s.SOG, 
                         'career_stats.GWG': s.GWG, 'career_stats.PP': s.PP,
                         'career_stats.SH': s.SH, win: win, loss: loss}};
    Player.update(query, update, callback);
}  

function storeGoalieGameStats(s){
    var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    var update = {$push: {game_stats: {season: s.season, team_name: s.team_name, 
                     opponent: s.opponent, date: s.date, home_game: Boolean(s.home_game),
                     win: Boolean(s.win), MIN: s.MIN, SA: s.SA, SV: s.SV, GA: s.GA,
                     SO: s.SO, G: s.G, A: s.A, PIM: s.PIM}}};
    Goalie.update(query, update, callback);
}

function updateGoalieSeasonStats(s){
    var update;
    win = Boolean(s.win)? 1: 0;
    loss = Boolean(s.win)? 0: 1;
    console.log('updatePlayerSeasonStats ', s, ' ', s.team_name);
    var query = {'season_stats.season': s.season, 'team.name': s.team_name,
                 'team.jersey_number': s.jersey_number};
    
    Goalie.find(query, function(err, result){
        if (err){
            console.log(err);
            return;
        }
        if (result.length === 0){
            query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
            update = {$push: {season_stats: {season: s.season, team_name: s.team_name,
                      MIN: s.MIN, SA: s.SA, SV: s.SV, GA: s.GA, SO: s.SO, G: s.G,
                      A: s.A, PIM: s.PIM, win: win, loss: loss}}}
            options = {setDefaultsOnInsert: true};
            Goalie.update(query, update, options, callback);
        } else {
            query = {'season_stats.season': s.season, 'team.name': s.team_name, 
                     'team.jersey_number': s.jersey_number};
            update = {$inc: {'season_stats.$.MIN': s.MIN, 'season_stats.$.SA': s.SA,
                            'season_stats.$.SV': s.SV, 'season_stats.$.GA': s.GA,
                            'season_stats.$.SO': s.SO, 'season_stats.$.G': s.G, 
                            'season_stats.$.A': s.A, 'season_stats.$.PIM': s.PIM, 
                            'season_stats.$.win': win, 'season_stats.$.loss': loss}};
            Goalie.update(query, update, callback);
        }
    });
}
    
function updateGoalieCareerStats(s){
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    console.log('updateCareerStats ', s, ' ', s.team_name);
    var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
    var update = {$inc: {'career_stats.MIN': s.MIN, 'career_stats.SA': s.SA, 
                         'career_stats.SV': s.SV, 'career_stats.GA': s.GA, 
                         'career_stats.SO': s.SO, 'career_stats.G': s.G,
                         'career_stats.A': s.A, 'career_stats.PIM': s.PIM,
                          win: win, loss: loss}};
    Goalie.update(query, update, callback);
}  

function storeTeamGameStats(s){
    var query = {name: s.team_name};
    var update = {$push: {game_stats: {season: s.season, opponent: s.opponent, 
                  date: s.date, home_game: Boolean(s.home_game), win: Boolean(s.win),
                  FS: s.FS, GA: s.GA, Q1: s.Q1, Q2: s.Q2, Q3: s.Q3, OT: s.OT, PA: s.PA,
                  SO: s.SO}}};
    Team.update(query, update, callback);
}

function updateTeamSeasonStats(s){
    var update;
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    // console.log('updateTeamSeasonStats ', s, ' ', s.team_name);
    var query = {'season_stats.season': s.season, name: s.team_name};
    
    Team.find(query, function(err, result){
        if (err){
            console.log(err);
            return;
        }
        if (result.length === 0){
            query = {name: s.team_name};
            update = {$push: {season_stats: {season: s.season, 
                      FS: s.FS, GA: s.GA, OT: s.OT, PA: s.PA, SO: s.SO,
                      win: win, loss: loss}}}
            options = {setDefaultsOnInsert: true};
            Team.update(query, update, options, callback);
        } else {
            query = {'season_stats.season': s.season, name: s.team_name};
            update = {$inc: {'season_stats.$.FS': s.FS, 'season_stats.$.GA': s.GA,
                             'season_stats.$.OT': s.OT, 'season_stats.$.PA': s.PA,
                             'season_stats.$.SO': s.SO, 'season_stats.$.win': win, 
                             'season_stats.$.loss': loss}};
            Team.update(query, update, callback);
        }
    });
}

function updateTeamAllTimeStats(s){
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    // console.log('updateTeamAllTimeStats ', s, ' ', s.team_name);
    var query = {name: s.team_name};
    var update = {$inc: {'alltime_stats.FS': s.FS, 'alltime_stats.GA': s.GA, 
                  'alltime_stats.OT': s.OT, 'alltime_stats.PA': s.PA, 
                  'alltime_stats.SO': s.SO, 'alltime_stats.win': win, 
                  'alltime_stats.loss': loss}};
    Team.update(query, update, callback);
}  

module.exports = {
    storeGameStats: storeGameStats,
    storePlayerGameStats: storePlayerGameStats,
    updatePlayerSeasonStats: updatePlayerSeasonStats,
    updatePlayerCareerStats: updatePlayerCareerStats,
    storeGoalieGameStats: storeGoalieGameStats,
    updateGoalieSeasonStats: updateGoalieSeasonStats,
    updateGoalieCareerStats: updateGoalieCareerStats,
    storeTeamGameStats: storeTeamGameStats,
    updateTeamSeasonStats: updateTeamSeasonStats,
    updateTeamAllTimeStats: updateTeamAllTimeStats
}
