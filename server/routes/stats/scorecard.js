var Team = require("../../models/team/team");
var storeScoreCardStats = require("../helpers/stats");
var getPlayers = require("./callbacks/getPlayers");
var getScorecard = require("./callbacks/getScorecard");
var postScorecard = require("./callbacks/postScorecard");
var cors = require("../../config/cors");


module.exports = function(app) {
  app.get("/players", getPlayers);
  app.get('/scorecard', getScorecard);
  app.post('/scorecard', postScorecard);
};
