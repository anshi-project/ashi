var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main")
var Team=require("../team/team");
var _ = require("lodash");

var gmSchema=new Schema({
    apparel:{},
    division:[String]
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