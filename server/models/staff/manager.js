var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var gmSchema=new Schema({
    lastname:String,
    firstname:String,
    apparel:{},
    contact:{},
    division:String,
    username:String,
    password:String
})

gmSchema.statics.assign=function(registration,$,_,next){
	var fields=["lastname","firstname","contact","apparel","username","password"]
	var gm={division:$.division};
	fields.forEach(v=>gm[v]=registration[v]);

	this.create(gm,function(err,doc){
		if(err)throw err;
		doc.query={division:$.division}
		next(doc);
	})
}

module.exports=mongoose.model("manager",gmSchema);