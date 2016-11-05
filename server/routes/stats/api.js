var Team = require("../../models/team/team");
var GameStats = require("../../models/team/game_stats");
var Player = require("../../models/players/main");
var getPlayerStats = require("./callbacks/getPlayerStats");
var getTeamStats = require("./callbacks/getTeamStats");
var getFullGameStats = require("./callbacks/getFullGameStats");

module.exports=function(app){
    app.get("/api/playerstats", getPlayerStats);
    app.get("/api/teamstats", getTeamStats);
    app.get("/api/fullgamestats", getFullGameStats);
}
