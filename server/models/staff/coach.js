var mongoose=require("mongoose");
var Staff=require("./main");
var Team=require("../team/team");

var teamSchema = {
		name:String,
		division:String,
		role:String,
	}

var coachSchema=new mongoose.Schema({
	team:teamSchema,
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
    var teamA = update["prev-team"].name;
    var teamB = update.team.name;

	this.findById(id,"team").exec((err,data)=>{
		data.team = update.team;
		data.save();
	})
	.then(()=>{Team.swap(teamA, teamB, id, "coaches");})
	.then(docs => { return callback(docs) })
	.catch(err=>{if(err) throw "Error updating team records for the coach";});		
}

module.exports=Staff.discriminator("coach",coachSchema);
