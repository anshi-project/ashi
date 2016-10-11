function updatePlayerSeasonStats(s){
    var win = Boolean(s.win)? 1: 0;
    var loss = Boolean(s.win)? 0: 1;
    console.log('updatePlayerSeasonStats ', s, ' ', team_name);
    query = {'season_stats.season': s.season, 'team.name': team_name, 'team.jersey_number': s.jersey_number};
    
    Player.find(query, function(err, result){
        if (err){
            console.log(err);
            return;
        }
        
        if (!result){
            query = {'team.name': team_name, 'team.jersey_number': s.jersey_number};
            update = {$push: {season_stats: {season: s.season, team_name: team_name,
                      G: +s.G, A: +s.A, P: +s.P, PM: +s.PM, PIM: +s.PIM, SOG: +s.SOG, 
                      GWG: +s.GWG, PP: +s.PP, SH: +s.SH, win: win, loss, loss}}}
            options = {setDefaultsOnInsert: true};
            Player.update(query, update, options, function(err){if (err){console.log(err)});
        }
    })
    
    update = {'season_stats.$.season': s.season, 'season_stats.$.team_name': team_name, {$inc: {'season_stats.$.G': +s.G, 'season_stats.$.A': +s.A, 
              'season_stats.$.P': +s.P, 'season_stats.$.PM': +s.PM, 'season_stats.$.PIM': +s.PIM, 'season_stats.$.SOG': +s.SOG, 
              'season_stats.$.GWG': +s.GWG, 'season_stats.$.PP': +s.PP, 'season_stats.$.SH': +s.SH, 'season_stats.$.win': win,
              'season_stats.$.loss', loss}}},
    options = { upsert: true, setDefaultsOnInsert: true }
    Player.update(query, update, options, function(err){if (err){console.log(err)});
}