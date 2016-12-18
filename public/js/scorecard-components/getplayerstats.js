export function getPlayerStats(p, opponent, home_game, result, date, season, ashiTeamName) {
    var playersStatsArr = [];
    while (p.length > 0) {
        var player = {
            jersey_number: String(p[1]),
            name: p[2],
            G: p[3],
            A: p[4],
            P: p[5],
            PM: p[6],
            PIM: p[7],
            PPG: p[8],
            SHG: p[9],
            GWG: p[10],
            OTG: p[11],
            SOG: p[12],
            SOM: p[13],
            result: result,
            opponent: opponent,
            date: date,
            season: season,
            home_game: home_game,
            team_name: ashiTeamName,
            stats_for_editing: [p[3], p[4], p[5], p[6], p[7],
                p[8], p[9], p[10], p[11], p[12], p[13]
            ]
        };
        playersStatsArr.push(player);
        p = p.slice(14);
    }
    return playersStatsArr;
}
