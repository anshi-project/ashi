var format = function(phonenumber){
	
	if(!phonenumber) return 
	var num = phonenumber.replace(/[^\d]/g, '');

	return num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

module.exports = schema =>{

	schema.pre("save",function(next){
		var c = this.contact
		if(!c) return next();
		
		if(this.isModified("contact.phone1")) c.phone1 = format(c.phone1);
 
 		if(c.phone2 && this.isModified("contact.phone2")) c.phone2 = format(c.phone2)

		if(c.private_data && this.isModified(c.private_data.guardian_number)){
			c.private_data.guardian_number = format(c.private_data.guardian_number);
		}
		next();
	})

}