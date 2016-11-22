var Team=require("../team/team")
var _ = require("lodash");

exports.assign=function(id,team,callback){
	var type=team.position=="Goalie"? "goalies":"players";
	var person;
	this.findById(id,function(err,doc){
		person = doc.fullname;
		doc.team.name = team.name;
		doc.team.position = team.position;
		doc.status = "Active";
		doc.save();})
	.then(()=> { Team.addToRoster({name:team.name},id,type)})
	.then(()=> { return callback(null,person)})
	.catch((err)=>{ if(err) return callback(err) })
}

exports.updateTeamRecords = function(id,prev, update, next){

	this.findById(id, function(err,player){
		if(err) return next(err);
		player.team.division = division( update.team.name);
		player.save();

		Team.swap(prev,update.team.name,id, player.team.position == "Goalie"? "goalies" : "players");
		return next(null,"Updated team record for player: "+id)
	})
}

exports.reset = function(teamName){
	this.find({"team.name":teamName},function(err,docs){
		docs.forEach(player=>{
			player.paid = false;
			player.status = "inactive";
			player.save();
		})
	})
}



