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



module.exports=Staff.discriminator("Coach",coachSchema);

	
