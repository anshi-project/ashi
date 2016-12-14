var parse=require("saymyname")

module.exports=function(schema){
	schema.virtual("fullname").get(function(){
	    var format=new parse(this.firstname+" "+this.lastname);
	    return format.humanize();
	})

	schema.virtual("contact[passport]").get(function(){
		var now = Date.now();
		var expirationDate = this.contact.passport_expiration
	
		if(now < Date.parse(expirationDate)) return "Yes";
		return "No"
	})
}