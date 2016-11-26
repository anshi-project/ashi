var format = function(phonenumber){
	var num = phonenumber.replace(/[^\d]/g, '');
	return num.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

module.exports = schema =>{

	schema.pre("save",function(next){
		var c = this.contact
		c.phone1 = format(c.phone1);

		if(c.phone2){
			c.phone2 = format(c.phone2)
		}else if(c.private_data && c.private_data.guardian_number){
			c.private_data.guardian_number = format(c.private_data.guardian_number);
		}
		next();
	})

}