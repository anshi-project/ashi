function getPlayers (req,res){
    res.send(req.session.teamData);
}

module.exports = getPlayers;