
var teams = require("../../../locals/fields/teams").namesAndKeys

function getScorecard (req,res){
    res.render("scorecard",{layout:"scorecard",teams}); 
}

module.exports = getScorecard;