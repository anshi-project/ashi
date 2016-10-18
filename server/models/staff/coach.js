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
	registration:{},
	team:{
		division:String,
		name:String,
		role:String
	}
})

coachSchema.statics.assign=function(registration,team,_,callback){
	var fields=["firstname","lastname","contact"];
	var fields2=["apparel","social_media","coaching_info","short_answers"];	
	var coach={team:team,registration:{}}

	fields.forEach(v=> coach[v]=registration[v]);
	fields2.forEach(x=> coach.registration[x]=registration[x]);
	
	this.create(coach,function(err,doc){
		if(err)throw err;
		doc.query={division:team.division,name:team.name}
		callback(doc);
	})
}

module.exports=mongoose.model("coach",coachSchema);