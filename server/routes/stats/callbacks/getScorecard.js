function getScorecard (req,res){
    res.render("scorecard",{layout:"scorecard"}); 
}

module.exports = getScorecard;