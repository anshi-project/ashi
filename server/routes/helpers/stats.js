var Team = require("../../models/team/team");
var GameStats = require("../../models/team/game_stats");
var Player = require("../../models/players/main");

var callback = function (err) {if (err) {console.log('error: ', err)}};
var win;
var loss;
var tie;


function storeGameStats(stats, response){

  var query = {'team_name': stats.team_name, 'opponent': stats.opponent,
               'date': stats.date, 'time': stats.time, 'season': stats.season};
  GameStats.find(query, function(err, res){
    if (err){
      console.log(err);
      return;
    }
    if (res.length === 0){
      new GameStats(stats).save(function(err, model){
        if (err) {
          console.log('error: ', err);
          response.send('Game not stored');
          return;
        }
        else {
          response.send('Game stored');
          query = {name: stats.team_name};
          var update = {$push: {"games_stats": model._id}};
          Team.update(query, update, callback);
          stats.ashi_players.map(storePlayerGameStats);
          stats.ashi_players.map(updatePlayerSeasonStats);
          stats.ashi_players.map(updatePlayerCareerStats);
          stats.ashi_goalies.map(storeGoalieGameStats);
          stats.ashi_goalies.map(updateGoalieSeasonStats);
          stats.ashi_goalies.map(updateGoalieCareerStats);
          storeTeamGameStats(stats.ashi_team);
          updateTeamSeasonStats(stats.ashi_team);
          updateTeamAllTimeStats(stats.ashi_team);
        };
      });
    }
  });
}

function storePlayerGameStats(s){
  var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
  var update = {$push: {"stats.player.game_stats": {season: s.season, team_name: s.team_name,
                   opponent: s.opponent, date: s.date, home_game: Boolean(s.home_game),
                   result: s.result, G: s.G, A: s.A, P: s.P, PM: s.PM,
                   PIM: s.PIM, GWG: s.GWG, PPG: s.PPG, SHG: s.SHG, OTG: s.OTG}}};
  Player.update(query, update, callback);
}

function updatePlayerSeasonStats(s){
  var update;
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  
  var query = {'stats.player.season_stats.season': s.season, 'team.name': s.team_name,
               'team.jersey_number': s.jersey_number};

  Player.find(query, function(err, res){
      if (err){
          console.log(err);
          return;
      }
      if (res.length === 0){
          query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
          update = {$push: {"stats.player.season_stats": {season: s.season, team_name: s.team_name,
                    games_played: 1, G: s.G, A: s.A, P: s.P, PM: s.PM, PIM: s.PIM, GWG: s.GWG,
                    PPG: s.PPG, SHG: s.SHG, OTG: s.OTG, win: win, tie: tie, loss: loss}}}
          options = {setDefaultsOnInsert: true};
          Player.update(query, update, options, callback);
      } else {
          query = {'stats.player.season_stats.season': s.season, 'team.name': s.team_name,
                   'team.jersey_number': s.jersey_number};
          update = {$inc: {'stats.player.season_stats.$.G': s.G, 'stats.player.season_stats.$.A': s.A,
                           'stats.player.season_stats.$.P': s.P, 'stats.player.season_stats.$.PM': s.PM,
                           'stats.player.season_stats.$.PIM': s.PIM, 'stats.player.season_stats.$.GWG': s.GWG,
                           'stats.player.season_stats.$.PPG': s.PPG, 'stats.player.season_stats.$.OTG': s.OTG,
                           'stats.player.season_stats.$.SHG': s.SHG, 'stats.player.season_stats.$.win': win,
                           'stats.player.season_stats.$.tie': tie, 'stats.player.season_stats.$.loss': loss,
                           'stats.player.season_stats.$.games_played': 1}};
          Player.update(query, update, callback);
      }
  });
}

function updatePlayerCareerStats(s){
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
  var update = {$inc: {'stats.player.career_stats.G': s.G, 'stats.player.career_stats.A': s.A,
                       'stats.player.career_stats.P': s.P, 'stats.player.career_stats.PM': s.PM,
                       'stats.player.career_stats.PIM': s.PIM, 'stats.player.career_stats.OTG': s.OTG,
                       'stats.player.career_stats.GWG': s.GWG, 'stats.player.career_stats.PPG': s.PPG,
                       'stats.player.career_stats.games_played': 1, 'stats.player.career_stats.SHG': s.SHG,
                       'stats.player.career_stats.win': win, 'stats.player.career_stats.tie': tie,
                       'stats.player.career_stats.loss': loss}};
  Player.update(query, update, callback);
}

function storeGoalieGameStats(s){
  var gaa = (s.GA / s.MIN) * 45;
  var svPercent = s.SV / s.SA;
  var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
  var update = {$push: {"stats.goalie.game_stats": {season: s.season, team_name: s.team_name,
                   opponent: s.opponent, date: s.date, home_game: Boolean(s.home_game),
                   result: s.result, MIN: s.MIN, SA: s.SA, SV: s.SV, GA: s.GA,
                   SVP: svPercent, GAA: gaa, SO: s.SO}}};
  Player.update(query, update, callback);
}

function updateGoalieSeasonStats(s){
  var update;
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  console.log('updatePlayerSeasonStats ', s, ' ', s.team_name);
  var query = {'stats.goalie.season_stats.season': s.season, 'team.name': s.team_name,
               'team.jersey_number': s.jersey_number};

  Player.find(query, function(err, res){
    if (err){
        console.log(err);
        return;
    }
    if (res.length === 0){
        query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
        update = {$push: {"stats.goalie.season_stats": {season: s.season, team_name: s.team_name,
                  games_played: 1, MIN: s.MIN, SA: s.SA, SV: s.SV, GA: s.GA, SO: s.SO,
                  win: win, tie: tie, loss: loss}}}
        options = {setDefaultsOnInsert: true};
        Player.update(query, update, options, callback);
    } else {
        query = {'stats.goalie.season_stats.season': s.season, 'team.name': s.team_name,
                 'team.jersey_number': s.jersey_number};
        update = {$inc: {'stats.goalie.season_stats.$.MIN': s.MIN, 'stats.goalie.season_stats.$.SA': s.SA,
                        'stats.goalie.season_stats.$.SV': s.SV, 'stats.goalie.season_stats.$.GA': s.GA,
                        'stats.goalie.season_stats.$.SO': s.SO, 'stats.goalie.season_stats.$.win': win,
                        'stats.goalie.season_stats.$.tie': tie, 'stats.goalie.season_stats.$.loss': loss,
                        'stats.goalie.season_stats.$.games_played': 1}};
        Player.update(query, update, callback);
    }
  });
}

function updateGoalieCareerStats(s){
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  console.log('updateCareerStats ', s, ' ', s.team_name);
  var query = {'team.name': s.team_name, 'team.jersey_number': s.jersey_number};
  var update = {$inc: {'stats.goalie.career_stats.MIN': s.MIN, 'stats.goalie.career_stats.SA': s.SA,
                       'stats.goalie.career_stats.SV': s.SV, 'stats.goalie.career_stats.GA': s.GA,
                       'stats.goalie.career_stats.SO': s.SO,
                       'stats.goalie.career_stats.games_played': 1,
                       'stats.goalie.career_stats.win': win, 'stats.goalie.career_stats.tie': tie,
                       'stats.goalie.career_stats.loss': loss}};
  Player.update(query, update, callback);
}

function storeTeamGameStats(s){
  var query = {name: s.team_name};
  var update = {$push: {game_stats: {season: s.season, opponent: s.opponent,
                date: s.date, home_game: Boolean(s.home_game), result: s.result,
                GF: s.GF, GA: s.GA, P1: s.P1, P2: s.P2, P3: s.P3, OT: s.OT,
                PPG: s.PPG, PPO: s.PPO, PKP: s.PKP, PPP: s.PPP}}};
  Team.update(query, update, callback);
}

function updateTeamSeasonStats(s){
  var update;
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  var query = {'season_stats.season': s.season, name: s.team_name};

  Team.find(query, function(err, res){
    if (err){
      console.log(err);
      return;
    }
    if (res.length === 0){
      query = {name: s.team_name};
      update = {$push: {season_stats: {season: s.season, games_played: 1,
                GF: s.GF, GA: s.GA, OT: s.OT,
                win: win, tie: tie, loss: loss}}}
      options = {setDefaultsOnInsert: true};
      Team.update(query, update, options, callback);
    }
    else {
      query = {'season_stats.season': s.season, name: s.team_name};
      update = {$inc: {'season_stats.$.GF': s.GF, 'season_stats.$.GA': s.GA,
                       'season_stats.$.OT': s.OT, 'season_stats.$.win': win,
                       'season_stats.$.tie': tie, 'season_stats.$.loss': loss,
                       'season_stats.$.games_played': 1}};
      Team.update(query, update, callback);
    }
  });
}

function updateTeamAllTimeStats(s){
  win = loss = tie = 0;
  if (s.result === 'win') win = 1;
  if (s.result === 'tie') tie = 1;
  if (s.result === 'loss') loss = 1;
  var query = {name: s.team_name};
  var update = {$inc: {'alltime_stats.GF': s.GF, 'alltime_stats.GA': s.GA,
                'alltime_stats.OT': s.OT, 'alltime_stats.win': win,
                'alltime_stats.tie': tie, 'alltime_stats.loss': loss,
                'alltime_stats.games_played': 1}};
  Team.update(query, update, callback);
}

function storeScoreCardStats(stats, response){
  storeGameStats(stats, response);
}

module.exports = storeScoreCardStats;
