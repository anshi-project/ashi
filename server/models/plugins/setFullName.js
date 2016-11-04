var parse=require("saymyname")

module.exports=function(schema){
	schema.virtual("fullname").get(function(){
	    var format=new parse(this.firstname+" "+this.lastname);
	    return format.humanize();
	})
}