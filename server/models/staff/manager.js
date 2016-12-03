var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Staff = require("./main")
var Team = require("../team/team");
var _ = require("lodash");
var validate = require('../helpers/validate');

var gmSchema = new Schema({
  contact:{
    phone1: {
      type: String,
      required: true,
      validate: validate.phoneNo,
    },
    phone2:{
      type: String,
      default: 'N/A',
      validate: validate.altPhoneNo,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: validate.email,
    },
    alt_email: {
      type: String,
      lowercase: true,
      validate: validate.altEmail,
    },
    passport: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    passport_expiration:{
      type: String,
      default: "N/A",
      validate: validate.passport,
    },
  },
  apparel: {
    shirt: {
      type: String,
      required: true,
      enum: validate.sizes,
    },
    polo: {
      type: String,
      required: true,
      enum: validate.sizes,
    },
    hat: {
      type: String,
      required: true,
      enum: validate.sizes,
    },
    jacket: {
      type: String,
      required: true,
      enum: validate.sizes,
    },
  },
})

gmSchema.statics.assign=function(id,division){
	this.findById(id,function(err,doc){
		if(err) throw err;
		doc.division=division;
		doc.status="Active";
		doc.save();
	})
	Team.addToRoster({division:{$in:division}},id,"managers")
}

gmSchema.statics.updateTeamRecords=function(id, prev, update,callback){
	var prev = prev.split(",");
	var update = update.division || [];

	Team.find({}, function(err,docs){

		docs.forEach(team =>{
			if(update.indexOf(team.division) == -1 && team.managers.indexOf(id) != -1){
				team.managers = team.managers.filter(v=> {return v != id})
			}else if(update.indexOf(team.division) != -1 && team.managers.indexOf(id) == -1){
				team.managers.push(id)
			}
			team.markModified("managers");
			team.save();
		})
		callback(docs);
	})
	.catch(err=>{if(err) throw "Error updating team records for the coach";});
}


module.exports=Staff.discriminator("manager",gmSchema);
