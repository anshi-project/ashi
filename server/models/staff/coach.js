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

coachSchema.statics.assign=function(id,team,role){

	this.findByIdAndUpdate(id,{status:"Active",team,role},
		{upsert:true,safe:true})
	
	Team.addToRoster({name:team},id,"coaches")
}

coachSchema.statics.removeFromTeam=function(id,callback){
	var currTeam;
	this.findById(id,"team").exec((err,data)=>{
		if(err) throw "Error removing Coach during the initial query.";
		currTeam={name:data.team.name};
		data.status="inactive";
		data.division="none";
		data.save();
	})
	.then(()=>{Team.pullFromRoster(currTeam,id,"managers")})
	.then(data=> {return callback(data)})
	.catch(err=>{if(err) throw "Error removing coach from team";});		
}

coachSchema.statics.changeRole=function(id,newRole,callback){
	this.findByIdAndUpdate(id,{"team.role":newRole},{upsert:true,safe:true})
		.then(()=>{ return callback()})
		.catch(err=>{ if(err) throw "Error updating the coaches role"});
}

coachSchema.statics.updateAssignment=function(id,newTeam,callback){
		var currTeam;
		this.findById(id,"division").exec(function(err,data){
			 if(err) throw "Error updating coach assignment during initial query.";
			 currTeam={name:data.team.name};
			 data.status="active";
			 data.team=newTeam.name;
			 data.save();
		})
		.then(()=>{Team.swap(currTeam,newTeam,id,"coaches")})
		.then(data=>{return callback(data) })
		.catch(err=>{ if(err)throw err; })
}

module.exports=Staff.discriminator("coach",coachSchema);
