var mongoose=require("mongoose");
var Staff=require("./main");
var Team=require("../team/team");

var enums = require("../../locals/fields/enums")
var fields = require("../commonFields/index")

var coachSchema = new mongoose.Schema({
	team:{
		name:{type: String, enum: enums.teams.names},
		division:{type:String, enum: enums.teams.divisions},
		role:{type:String,enum: enums.coach.roles}
	}, 
	background: fields.background.coach,
	apparel: fields.apparel.staff
})

coachSchema.pre("save",function(next){
	if(this.isNew()){
		this.status = "Active";
		//status on base model defaults to active upon creation, but coaches are an exception because
		//this Staff-coach model is being created from a previously created object (coach registration model)
		this.username = this.firstname + Math.floor(Math.random()*40);
		this.password = "password";
		next()
	}
})// username and password are required fields on the base staff model. Coaches however
// do not need login credentials as of this version of the app. I'm just setting up defaults
//here to serve as a placeholder rather than overwrite the required flag of these 2 fields



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

	
