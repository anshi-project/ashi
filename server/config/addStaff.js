var randomstring = require("randomstring");
var Mailer = require("./nodemailer")

var formatMessage = function(type,url,token){
	return "Please follow the link below and fill out the short form to be given A.S.H.I. credentials.<br>"+
			url + '/register/'+type+"?token="+token
} 



var defaultUserObj = function(email){
	var exp = new Date()
	exp.setDate(exp.getDate() + 7)
	//TOKEN EXPIRES IN ONE WEEK.


	return {
		firstname:"firstname",
		lastname:"lastname",
		contact:{
			email, 
			phone1:"5555555555",
		},
		apparel:{
			shirt:"S",
			hat:"S/M",
			jacket:"XL",
			polo:"S"
		},
		username:randomstring.generate(),
		regToken:randomstring.generate(),
		regTokenExp:exp
	}
}


module.exports = function(type, email, url, next){
	var User = require("../models/staff/main")
	var UserOfType = require("../models/staff/"+type)

	User.findOne({"contact.email":email}).exec(function(err,doc){
		if(err) {
			
			return next(String(err))
		}
		else if(doc){		
			
			return next("A user with this email already exists.")
		}else{
			
			var defaultData = defaultUserObj(email);
			var token = defaultData.regToken
			var message = formatMessage(type, url,token);
			
			var user = new UserOfType(defaultData);
			
			
			//add default data so we can store a placeholder in the database until the user has filled out the form
			user.save()
			.then(()=>{
				Mailer({
					recipients:`<${email}>`,
					message,
					subject: "A.S.H.I Staff Registration"
				}, 
				(err,info) => {
					if(err) return next(err);
					
					return next(null, "Message successfully delivered to "+email)	
				})
			})
		}
	}) 
}


