var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Staff=require("./main")
var Team=require("../team/team");

var gmSchema=new Schema({
    apparel:{},
    division:String
})

gmSchema.statics.assign=function(id,division){
	this.findByIdAndUpdate(id,
		{status:"Active",division},{upsert:true,safe:true})
	
	Team.addToRoster({division},id,"managers")
}

gmSchema.statics.removeFromDivision=function(id,callback){
	var currDivision;
	this.findById(id,"division").exec((err,data)=>{
		if(err) throw "Error removing GM during the initial query.";
		currDivision=data.division;
		data.status="inactive";
		data.save();
	})
	.then(()=>{Team.pullFromRoster({division:currDivision},id,"managers")})
	.then(data=> {return callback(data)})
	.catch(err=>{if(err) throw err;});		
}

gmSchema.statics.updateAssignment=function(id,newDivision,callback){
		var currDivision;
		this.findById(id,"division").exec(function(err,data){
			 if(err) throw "Error updating GM assignment during initial query.";
			 currDivision={division:data.division};
			 data.status="Active";
			 data.division=newDivision.division;
			 data.save();
		})
		.then(()=>{Team.swap(currDivision,newDivision,id,"managers") })
		.then(data=>{return callback(data) })
		.catch(err=>{ if(err)throw err; })
}




module.exports=Staff.discriminator("manager",gmSchema);