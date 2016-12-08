var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Staff = require("./main")
var Team = require("../team/team");

var _ = require("lodash");

var divisions = require("../../locals/fields/enums").teams.divisions
var apparel = require("../commonFields/apparel").staff

var gmSchema = new Schema({
  division: [{ type: String, enum: divisions }],
  apparel
})



gmSchema.statics.assign=function(id,division){
	this.findById(id,function(err,doc){
		if(err) throw err;
		doc.division=division;
		doc.status="Active";
		doc.save();
	})
	Team.addToRoster({division:{$in:division}},id,"managers")
}// function is activated when a manager is initial confirmed by an admin  
//happens only once per manager



module.exports=Staff.discriminator("Manager",gmSchema);
