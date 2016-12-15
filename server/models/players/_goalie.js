var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Player = require("./main");

var GoalieStatsSchema = require("./goalieStatSchema")

var goalie = Player.discriminator("Goalie", GoalieStatsSchema);

module.exports = goalie;
