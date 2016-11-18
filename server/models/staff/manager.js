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

gmSchema.statics.updateTeamRecords=function(id,update,callback){
	
		var prev = update["prev-division"]
		var curr = update.division;
		var a = prev.filter((v,i,a) => {return a.lastIndexOf(v) == i && curr.indexOf(v)==-1})
		var b = curr.filter((v,i,a) => {return a.lastIndexOf(v) == i && prev.indexOf(v) == -1})

	this.findById(id,"division").exec((err,data)=>{
		data.division = update.division;
		data.markModified("division");
		data.save();
	})
	.then(()=>{
		Team.find({},"division managers")
		.exec(function(err,docs){
			docs.forEach(team =>{
				if(prev.indexOf(team.division)!= -1){
					team.managers = team.managers.filter(v=> {return v != id})
				}else{
					team.managers.push(id)
				}
				team.markModified("managers");
				team.save();
			})
			callback(docs);
		})
	})
	.catch(err=>{if(err) throw "Error updating team records for the coach";});		
}


gmSchema.statics.removeFromDivision=function(id,callback){
	this.findById(id,"division").exec((err,data)=>{
		if(err) throw "Error removing GM during the initial query.";
		data.status="inactive";
		data.save();
	})
	.then((doc)=>{Team.pullFromRoster({division:doc.division},id,"managers")})
	.then(data=> {return callback(data)})
	.catch(err=>{if(err) throw err;});		
}

module.exports=Staff.discriminator("manager",gmSchema);