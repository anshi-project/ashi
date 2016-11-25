var storeScoreCardStats = require('../../helpers/stats')

function postScorecard(req, res){
  var response = res;
  var stats = req.body.stats;
  console.log(stats)
  storeScoreCardStats(stats, response);
}

module.exports = postScorecard;
