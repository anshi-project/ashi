var mongoose=require("mongoose");
var Staff=require("./main");
var Team=require("../team/team");

var enums = require("../../locals/fields/enums")
var fields = require("../commonFields/index")

var coachSchema = new mongoose.Schema({
	username:{type:String, required:false, unique:false },
	//coaches currently do not need to log in 
	team:{
		name:{type: String, enum: enums.teams.names},
		division:{type:String, enum: enums.teams.divisions},
		role:{type:String,enum: enums.coach.roles}
	}, 
	status:{type:String, default:"Active", enum:["Active","inactive"]},
	background: fields.background.coach,
	apparel: fields.apparel.staff
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

module.exports=Staff.discriminator("Coach",coachSchema);

	
