var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameStatsSchema = new Schema({
    home_game: {type: Boolean, default: true},
    opponent: {type: String},
    date: {type: String},
    time: {type: String},
    ashi_team_stats: {type:Schema.Types.ObjectId, ref: "TeamGameStats"},
    opponent_stats: {type:Schema.Types.ObjectId, ref: "TeamGameStats"}
});

module.exports = mongoose.model('GameStats', GameStatsSchema);

