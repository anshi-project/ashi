import {getStats} from './getstats';
import {getPlayerStats} from './getplayerstats';
import {getGoalieStats} from './getgoaliestats';
import {toasts} from './toasts/toasts';

export function collectGameStats() {
    var ashiTeamName = $('.ashi-team-name').text();
    var home_game = $('.home-game').text();
    var incompleteScorecard = false;
    var date;
    var season;
    var arr;
    var a;
    var o;
    var ap;
    var ag;
    var at;
    var op;
    var og;
    var ot;
    var opponent = $('.team-name-input').val();
    var gameNotes;
    var ashiResult;
    var opponentResult;
    if ($('#flatpickr').val() === '') {
        toasts.setDateTime();
        return 'error';
    } else {
        date = $('#flatpickr').val().split(' ')[0];
        season = date.substr(0, 4);
        var time = $('#flatpickr').val().split(' ')[1];
    }

    if ($('.team-name-input').val() === "") {
        toasts.opponentName();
        return 'error';
    }

    var homeTeamStats = ['.home-playersTable', '.home-goaliesTable', '.home-team-stats'].map(getStats);
    var roadTeamStats = ['.road-playersTable', '.road-goaliesTable', '.road-team-stats'].map(getStats);
    homeTeamStats.map(function(array) {
        if (array[0] === 'incomplete') {
            incompleteScorecard = true;
        }
    });
    roadTeamStats.map(function(array) {
        if (array[0] === 'incomplete') {
            incompleteScorecard = true;
        }
    });

    if (incompleteScorecard) {
        toasts.fillOutBlank();
        return 'error';
    }

    if (home_game === 'true') {
        ap = homeTeamStats[0];
        ag = homeTeamStats[1];
        at = homeTeamStats[2];
        op = roadTeamStats[0];
        og = roadTeamStats[1];
        ot = roadTeamStats[2];
    } else {
        op = homeTeamStats[0];
        og = homeTeamStats[1];
        ot = homeTeamStats[2];
        ap = roadTeamStats[0];
        ag = roadTeamStats[1];
        at = roadTeamStats[2];
    }

    if (at[7] > ot[7]) {
        ashiResult = 'win';
        opponentResult = 'loss'
    }
    if (at[7] === ot[7]) ashiResult = opponentResult = 'tie';
    if (at[7] < ot[7]) {
        ashiResult = 'loss';
        opponentResult = 'win'
    }

    if (ag[4] === 0 || og[4] === 0) {
        toasts.shotsAgainst();
        return 'error';
    }

    if (ag[3] === 0 || og[3] === 0) {
      toasts.goalieMinutes();
      return 'error';
    }

    var pkPercAshi = ot[9] > 0 ? (ot[9] - ot[8]) / ot[9] : -999; // -999 means that there where no power play opportunities against.
    var pkPercOpp = at[9] > 0 ? (at[9] - at[8]) / at[9] : -999;
    var ppPercAshi = at[9] > 0 ? (at[8] / at[9]) : -999;
    var ppPercOpponent = ot[9] > 0 ? (ot[8] / ot[9]) : -999;
    var ashi_player_stats = getPlayerStats(ap, opponent, home_game, ashiResult, date, season, ashiTeamName);
    var ashi_goalie_stats = getGoalieStats(ag, opponent, home_game, ashiResult, date, season, ashiTeamName);
    var ashi_team_stats = {
        P1_goals: at[1],
        P2_goals: at[2],
        P3_goals: at[3],
        OT: at[4],
        OT2: at[5],
        OT3: at[6],
        GF: at[7],
        GA: ot[7],
        PPG: at[8],
        PPO: at[9],
        PKP: pkPercAshi,
        result: ashiResult,
        date: date,
        home_game: home_game,
        opponent: opponent,
        season: season,
        team_name: ashiTeamName,
        PPP: ppPercAshi,
        stats_for_editing: [at[1], at[2], at[3], at[4], at[5],
            at[6], at[7], at[8], at[9]]
    };
    var opponent_player_stats = getPlayerStats(op, ashiTeamName, !home_game, opponentResult, date, season, ashiTeamName);
    var opponent_goalie_stats = getGoalieStats(og, ashiTeamName, !home_game, opponentResult, date, season, ashiTeamName);
    var opponent_team_stats = {
        P1_goals: ot[1],
        P2_goals: ot[2],
        P3_goals: ot[3],
        OT: ot[4],
        OT2: ot[5],
        OT3: ot[6],
        GF: ot[7],
        GA: at[7],
        PPG: ot[8],
        PPO: ot[9],
        PKP: pkPercOpp,
        PPP: ppPercOpponent,
        result: opponentResult,
        date: date,
        home_game: !home_game,
        opponent: ashiTeamName,
        season: season,
        stats_for_editing: [ot[1], ot[2], ot[3], ot[4], ot[5],
            ot[6], ot[7], ot[8], ot[9]]
    };
    var ashiStats = [ashi_player_stats, ashi_goalie_stats, ashi_team_stats];
    var opponentStats = [opponent_player_stats, opponent_goalie_stats, opponent_team_stats];

    var gameStats = {
        team_name: ashiTeamName,
        home_game: home_game,
        opponent: opponent,
        date: date,
        time: time,
        ashi_players: ashi_player_stats,
        ashi_goalies: ashi_goalie_stats,
        ashi_team: ashi_team_stats,
        opponent_players: opponent_player_stats,
        opponent_goalies: opponent_goalie_stats,
        opponent_team: opponent_team_stats,
        season: season
    }

    localforage.getItem('ashi-game-notes', function(err, value) {
        gameStats.gameNotes = value;
    });
    localforage.removeItem('ashi-game-notes', function(err) {console.log(err)});

    if (ashi_player_stats.length === 0 || ashi_goalie_stats.length === 0 ||
        opponent_player_stats.length === 0 || opponent_goalie_stats.length === 0) {
        toasts.tickBoxes();
        return 'error';
    }
    return gameStats;
}
