var Team=require("../team/team")
var _ = require("lodash");
var getDivision = require("../../locals/fields/teams").getDivision;

exports.assign=function(id,team,callback){
	var type=team.position=="Goalie"? "goalies":"players";

	this.findById(id,function(err,doc){
		var flag = doc.team.name != team.name;
		var person = doc.fullname;
		var prev = doc.team.name;
		
		doc.team.name = team.name;
		doc.status = "Active";
		doc.paid = false;
		doc.save()
			.then(() => {
				if(flag){
					Team.swap(prev, doc.team.name, id, type)		
				}
				return callback(null, person)
			})
			.catch((err)=>{ if(err) return callback(err) })
	})
}


exports.updatePayments = function(reqBody, next){
	var ids = Object.keys(reqBody);
	
	this.find({_id:{$in:ids}},"paid headshot",function(err,docs){
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



