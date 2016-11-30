var mongoose=require("mongoose");
var Staff=require("./main");
var Team=require("../team/team");

var teamSchema = {
		name:String,
		division:String,
		role:String,
	}

var coachSchema = new mongoose.Schema({
	team:teamSchema,
	status:{type:String,default:"Active"}, 
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


coachSchema.statics.updateTeamRecords = function(id,prev,update,callback){
  	var division = require("../../locals/fields/teams").getDivision;
  	
	this.findById(id, "team contact").exec((err,coach)=>{
		coach.team.division = division( update.team.name);
		coach.save();
	})
	.then(()=>{Team.swap(prev, update.team.name, id, "coaches");})
	.then(docs => { return callback(null,docs) })
	.catch(err=>{if(err) return callback("Error updating team records for the coach");});		
}

module.exports=Staff.discriminator("coach",coachSchema);

	
