var randomstring = require("randomstring");
var Mailer = require("./nodemailer")

var message = function(type,token){
	return "Please follow the link below and fill out the short form to be given A.S.H.I. credentials.\n "+'http://localhost:3000/register/'+type+"?token="+token
} 


module.exports = function(type, email, next){
	var User = require("../models/staff/"+type)
	var token = randomstring.generate();
	var exp = new Date()

	exp.setDate(exp.getDate() + 7)


	User.findOne({"contact.email":email},function(err,doc){
		if(err) {
			return next(err)
		}
		else if(doc){
			return next("A user with this email already exists.")
		}else{
			var user = new User({contact:{email},regToken:token,regTokenExp:exp})
			user.save().then(()=>{
				Mailer({
					recipients:`<${email}>`,
					message:message(type,token),
					subject: "A.S.H.I Staff Registration"
				}, 
				(err,info) => {
					if(err) return next(err)
					return next(null, info)	
				})
			})
		}
	}) 
}


