var Team=require("../team/team")
var _ = require("lodash");

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

function getDuplicateIndexes(players){
	var nums = players.map(v =>{ return v.team.jersey_number})
		console.log(nums)
	for(var i = 0; i< nums.length; i++){
		if( nums.lastIndexOf(nums[i]) != i){
			return ([i, nums.lastIndexOf(nums[i])])
		}
	}
}

 exports.validateUniqueJerseyNumbers = function(players){
	if(!players || players.length == 1) return;
	var uniqueNumbersArray = _.uniqBy(players, "team.jersey_number");

	while(uniqueNumbersArray.length !== players.length){
		var dupes = getDuplicateIndexes(players);
		var A = dupes[0], B = dupes[1];
		console.log(dupes)
		if(Date.parse(players[A].createdAt)< Date.parse(players[B].createdAt)){
			players[A].team.jersey_number == players[A].hockey_info.jersey_number.choice2;
			players[A].save()

		}else{
			players[B].team.jersey_number == players[B].hockey_info.jersey_number.choice2;
			players[B].save()
		}
		uniqueNumbersArray = _.uniqBy(players, "team.jersey_number");
	}
}//handles when two players have matching numbers but not 3 or more!! TODO come up with better solution


