export function getGoalieStats(g, opponent, home_game, result, date, season, ashiTeamName){
	var goaliesStatsArr = [];
	while (g.length > 0){
		var goalie = {jersey_number: String(g[1]), name: g[2], MIN: g[3], SA: g[4],
		              SV: g[5], GA: g[6], SO: g[7], G: g[8], A: g[9], P: g[10],
		              PIM: g[11], SOSh: g[12], SOSa: g[13],
		              result: result, opponent: opponent, date: date, season: season,
		              home_game: home_game, team_name: ashiTeamName,
                  stats_for_editing: [g[3], g[4], g[5], g[6], g[7],
                  g[8], g[9], g[10], g[11], g[12], g[13]]};
		goaliesStatsArr.push(goalie);
		g = g.slice(14);
	}
	return goaliesStatsArr;
}
