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
    G: {type: Number, default: 0},
    A: {type: Number, default: 0},
    P: {type: Number, default: 0},
    PM: {type: Number, default: 0},
    PIM: {type: Number, default: 0},
    OTG: {type: Number, default: 0},
    GWG: {type: Number, default: 0},
    PP: {type: Number, default: 0},
    SH: {type: Number, default: 0}
});

var GoalieStatsSchema = new Schema({
    _id: false,
    jersey_number: {type: Number},
    name: {type: String},
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    season: {type: Number, default: 0},
    win: {type: Boolean},
    MIN: {type: Number, default: 0},
    SA: {type: Number, default: 0},
    SV: {type: Number, default: 0},
    GA: {type: Number, default: 0},
    SO: {type: Number, default: 0}
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
    GF: {type: Number, default: 0},
    GA: {type: Number, default: 0}
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

