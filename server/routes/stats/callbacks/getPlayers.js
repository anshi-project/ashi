var Team=require("../../../models/team/team")

function getPlayers (req,res){
    
    Team.find({},"players name key")
        .populate({
        	path:"players",
        	sort:{"team.jersey_number":1},
        	select:"firstname lastname team",
        	match:{status:"Active"}})
        .then(docs => {res.send(docs)})
        .catch(err=> {if(err){res.send(String(err)).status(500)}})
}

module.exports = getPlayers;