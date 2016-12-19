
var _ = require("lodash");
var mongoose = require("mongoose");

exports.assign=function(id,team,callback){
	var Team = mongoose.model("team")	


	this.findById(id,function(err,doc){
		doc.team.name = team.name;
		doc.status = "Active";
		doc.paid = false;
		doc.save()
			.then(() => {
				Team.update({name:team.name},{players:{$push:id}},{upsert:true}).exec()		
			})
			.then(() => { return callback(null,`Successfully added ${doc.fullname} to the ${team} roster`) })	
			.catch((err)=>{ if(err) return callback(String(err)) })
	})
}

exports.renewMembership = function(query, body, callback){

    var Team = mongoose.model("team")

    var teamName;
    var id;
    this.findOne(query)
    	.then(player =>{
    		teamName = player.team.name;
    		id = player._id
    		player.status = "renewing membership";
    		player.hockey_info.position = body.position;
    		player.hockey_info.team = body.team;
    		player.save(err=>{if(err)throw new Error(String(err))});
    	})
    	.then(() =>{
			Team.update({name:teamName},{$push:{players:id}},{upsert:true}).exec()
    	})
    	.then(() => {return callback(null,"You are now registered for the upcoming season.")})
    	.catch(err => {return callback(String(err))})
}


exports.updatePayments = function(reqBody, next){
	var ids = Object.keys(reqBody);
	var Player = this;
	var paid;
	var headshot;

	ids.forEach(id => {
		paid = reqBody[id].paid;
		headshot = reqBody[id].headshot;
		Player.findByIdAndUpdate(id, {paid,headshot},{upsert:true})
			.catch(err => {if(err) return next("Something went wrong while updating player's payment status")})
	})
	return next(null, "Updated player's payment status");
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


