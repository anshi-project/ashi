var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var coachSchema=new Schema({
	lastname:String,
	firstname:String,
	contact:{
		email:String,
		alt_email:String,
		phone1:String,
		phone2:String,
		passport:String,
		passport_expiration:String
	},
	background:{},
	team:{
		division:String,
		name:String,
		role:String
	}
})

coachSchema.statics.assign=function(registration,team,_,callback){
	var fields=["firstname","lastname","contact","apparel","background"];
	var coach={team:team};

	fields.forEach(v=>coach[v]=registration[v]);

	this.create(coach,function(err,doc){
		if(err)throw err;
		doc.query={division:team.division,name:team.name}
		callback(doc);
	})
}

module.exports=mongoose.model("coach",coachSchema);
