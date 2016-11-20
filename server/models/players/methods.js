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

exports.updateTeamRecords = function(id, update, next){
	var division = require("../../locals/fields/teams").getDivision;
	var teamA = update["prev-team"].name; 
	var teamB = update.team.name;

	this.findById(id, function(err,doc){
		var category = doc.team.position == "Goalie"? "goalies" : "players"
		doc.team.name = update.team.name;
		doc.team.division = division( update.team.name);
		doc.paid = update.paid;
		doc.headshot = update.headshot;
		doc.markModified("team.name")
		doc.save();

		if(teamA!= teamB){
			Team.swap(teamA,teamB,id,category);
		}
		next(null,doc);
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



