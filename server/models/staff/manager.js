var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main")
var Team=require("../team/team");

var gmSchema=new Schema({
    apparel:{},
    division:String
})

gmSchema.statics.assign=function(id,division){
	this.findById(id,function(err,doc){
		if(err) throw err;
		doc.division=division;
		doc.status="Active";
		doc.save();
	})
	
	Team.addToRoster({division},id,"managers")
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