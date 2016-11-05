function getShow(req,res){
        var Team=require("../../../models/team/team")
        Team.findOne({name:"U20"}).populate("players").exec(function(e,d){
            res.send(d)
        });
}

module.exports = getShow;

