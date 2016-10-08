var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamGameStatsSchema = new Schema({
    _id: false,
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
    home_game: {type: Boolean, default: true},
    opponent: {type: String},
    date: {type: String},
    time: {type: String},
    ashi_team_stats: [TeamGameStatsSchema],
    opponent_stats: [TeamGameStatsSchema]
});

module.exports = mongoose.model('GameStats', GameStatsSchema);

