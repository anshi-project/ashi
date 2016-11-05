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
    result: {type: String},
    G: {type: Number, default: 0},
    A: {type: Number, default: 0},
    P: {type: Number, default: 0},
    PM: {type: Number, default: 0},
    PIM: {type: Number, default: 0},
    OTG: {type: Number, default: 0},
    GWG: {type: Number, default: 0},
    PPG: {type: Number, default: 0},
    SHG: {type: Number, default: 0},
    SOG: {type: Number, default: 0},
    SOM: {type: Number, default: 0}
});

var GoalieStatsSchema = new Schema({
    _id: false,
    jersey_number: {type: Number},
    name: {type: String},
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    season: {type: Number, default: 0},
    result: {type: String},
    MIN: {type: Number, default: 0},
    SA: {type: Number, default: 0},
    SV: {type: Number, default: 0},
    GA: {type: Number, default: 0},
    SO: {type: Number, default: 0},
    G:{type:Number,default:0},
    A:{type:Number,default:0},
    P:{type:Number,default:0},
    PIM:{type:Number,default:0},
    SOSh:{type:Number,default:0},
    SOSa:{type:Number,default:0}
});

var TeamGameStatsSchema = new Schema({
    _id: false,
    home_game: {type: Boolean},
    opponent: {type: String},
    date: {type: String},
    result: {type: String},
    season: {type: Number},
    P1_goals: {type: Number, default: 0},
    P2_goals: {type: Number, default: 0},
    P3_goals: {type: Number, default: 0},
    OT: {type: Number, default: 0},
    OT2:{type:Number,default:0},
    OT3:{type:Number,default:0},
    GF: {type: Number, default: 0},
    GA: {type: Number, default: 0},
    PPG: {type: Number, default: 0},
    PPO: {type: Number, default: 0},
    PKP: {type: Number, default: 0},
    PPP: {type: Number, default: 0}
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
    opponent_team: [TeamGameStatsSchema],
    gameNotes: {type: String}
});

module.exports = mongoose.model('GameStats', GameStatsSchema);
