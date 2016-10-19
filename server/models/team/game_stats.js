var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerStatsSchema = new Schema({
    _id: false,
    jersey_number: {type: Number},
    name: {type: String},
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    season: {type: Number},
    win: {type: Boolean},
    G: {type: Number},
    A: {type: Number},
    P: {type: Number},
    PM: {type: Number},
    PIM: {type: Number},
    SOG: {type: Number},
    GWG: {type: Number},
    PP: {type: Number},
    SH: {type: Number}
});

var GoalieStatsSchema = new Schema({
    _id: false,
    jersey_number: {type: Number},
    name: {type: String},
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    season: {type: Number},
    win: {type: Boolean},
    MIN: {type: Number},
    SA: {type: Number},
    SV: {type: Number},
    GA: {type: Number},
    SO: {type: Number},
    G: {type: Number},
    A: {type: Number},
    PIM: {type: Number}
});

var TeamGameStatsSchema = new Schema({
    _id: false,
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    win: {type: Boolean},
    season: {type: Number},
    Q1_goals: {type: Number, default: 0},
    Q2_goals: {type: Number, default: 0},
    Q3_goals: {type: Number, default: 0},
    OT: {type: Number, default: 0},
    FS: {type: Number, default: 0},
    PA: {type: Number, default: 0},
    SO: {type: Number, default: 0}
});

var GameStatsSchema = new Schema({
    team_name: {type: String},
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    season: {type: Number},
    time: {type: String},
    ashi_players: [PlayerStatsSchema],
    ashi_goalies: [GoalieStatsSchema],
    ashi_team: [TeamGameStatsSchema],
    opponent_players: [PlayerStatsSchema],
    opponent_goalies: [GoalieStatsSchema],
    opponent_team: [TeamGameStatsSchema]
});

module.exports = mongoose.model('GameStats', GameStatsSchema);

