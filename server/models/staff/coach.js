var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main");
var Team=require("../team/team");

var coachSchema=new Schema({
	team:{
		name:String,
		division:String,
		role:String,
	},
	role:String,
	status:{type:String,default:"Active"},
	/*	This models status field defaults to active because unlike the 
	other two categories of staff member, a coach model instance is created 
	after a 'coach-registration' model has been approved and assigned to a team. 
		The other 2 categories (GM, admin) are created directly after their respective 
	registration forms are submitted, and need to be approved by an existing admin.
	*/
	contact:{
		email:String,
		alt_email:String,
		phone1:String,
		phone2:String,
		passport:String,
		passport_expiration:String
	},
	background:{
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


coachSchema.statics.removeFromTeam=function(id,callback){
	var currTeam;
	this.findById(id,"team").exec((err,data)=>{
		if(err) throw "Error removing Coach during the initial query.";
		currTeam={name:data.team.name};
		data.status="inactive";
		data.save();
	})
	.then(()=>{Team.pullFromRoster(currTeam,id,"managers")})
	.then(data=> {return callback(data)})
	.catch(err=>{if(err) throw "Error removing coach from team";});		
}

module.exports=Staff.discriminator("coach",coachSchema);
