var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamGameStatsSchema = new Schema({
    Q1_goals: {type: Number, default: 0},
    Q2_goals: {type: Number, default: 0},
    Q3_goals: {type: Number, default: 0},
    OT: {type: Number, default: 0},
    FS: {type: Number, default: 0},
    PA: {type: Number, default: 0},
    SO: {type: Number, default: 0}
});

module.exports('TeamGameStats', TeamGameStatsSchema);