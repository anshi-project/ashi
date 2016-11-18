var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main");
var Team=require("../team/team");
var _ = require("lodash");

var teamSchema = {
		name:String,
		division:String,
		role:String,
	}

var coachSchema=new Schema({
	team:teamSchema,
	team2:teamSchema,
	team3:teamSchema,
	status:{type:String,default:"Active"}, 
	contact:{
		social_media:{},
		email:String,
		alt_email:String,
		phone1:String,
		phone2:String,
		passport:String,
		passport_expiration:String
	},
	background:{
		social_media:{},
	    former_coaching_positions:[{type:String}],
	    hometown:String,         
	    short_answers:{
	        career_highlights:String,
	        preparation:String,
	        coaching_style:String,
	        why_a_good_candidate:String,
	        create_team_atmosphere:String,
	    },
	    preferred_coaching_position:{type:String},
	    team_applying_for:String,
	    highest_level_coached:String		
	},
	apparel:{}
})


coachSchema.statics.updateTeamRecords=function(id,update,callback){
	var prev = [update["prev-team"],update["prev-team2"],update["prev-team3"]].map(v=>{return v.name})
	var curr = [update["team"],update["team2"],update["team3"]].map(v=>{return v.name})
		prev = prev.filter((v,i,a) => {return a.lastIndexOf(v) == i && curr.indexOf(v)==-1})
		curr = curr.filter((v,i,a) => {return a.lastIndexOf(v) == i && prev.index(v) == -1})

	this.findById(id,"team").exec((err,data)=>{
		data.team = update.team;
		data.team2 = update.team2;
		data.team3 = update.team3;
		data.save();
	})
	.then(()=>{
		Team.find({name:{$in: prev.concat(curr)}},"name coaches")
		.exec(function(err,docs){
			docs.forEach(team =>{
				if(prev.indexOf(team.name)!= -1){
					team.coaches = team.coaches.filter(v=>{return v!=id})
				}else{
					team.coaches.push(id)
				}
				team.markModified("coaches");
				team.save();
			})
			callback(docs);
		})
	})
	.catch(err=>{if(err) throw "Error updating team records for the coach";});		
}

module.exports=Staff.discriminator("coach",coachSchema);
