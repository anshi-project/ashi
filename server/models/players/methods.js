var Team=require("../team/team")
var _ = require("lodash");
var getDivision = require("../../locals/fields/teams").getDivision;

exports.assign=function(id,team,callback){
	var type=team.position=="Goalie"? "goalies":"players";
	var person;
	var newTeam;
	this.findById(id,function(err,doc){
		newTeam = doc.team.name != team.name;
		person = doc.fullname;
		doc.team.name = team.name;
		doc.team.division = getDivision(team.name);
		doc.status = "Active";
		doc.paid = false;
		doc.save();

	})
	.then(()=> { 
		if(newTeam){
			Team.addToRoster({name:team.name},id,type)
		}
		return callback(null,person);
	})
	.catch((err)=>{ if(err) return callback(err) })
}

exports.updateTeamRecords = function(id,prev, update, next){

	this.findById(id, function(err,player){
		if(err) return next(err);
		player.team.division = getDivision( update.team.name);
		player.save();

		Team.swap(prev,update.team.name,id, player.team.position == "Goalie"? "goalies" : "players");
		return next(null,"Updated team record for "+player.fullname)
	})
}



exports.updatePayments = function(reqBody, next){
	var ids = Object.keys(reqBody);
	
	this.find({_id:{$in:ids}},function(err,docs){
		if(err) return next(err);
		docs.forEach(player=>{
			var id = player._id;
			var update = reqBody[id];
		
			player.paid = update.paid;
			player.headshot = update.headshot;
			player.save()
		})
		return next(null, docs);
	})
}



