var randomstring = require("randomstring");
var Mailer = require("./nodemailer");
var User = require("../models/staff/main");

var date = new Date();
	date.setHours(date.getHours() + 3)

var expiration = date.toTimeString(); 


var format = function(token, url){		
	return "<p>To reset your A.S.H.I account Password, simply follow the link below.</p>"+ 
		   `<p>${url}/account/reset/${token}</p>`+
           `<p>This link will expire at <em>${expiration}<em></p>`+
           "<p>If you feel this is a mistake, you may ignore this message and your account will remain unchanged</p>"	
} 


module.exports = function(email,url ,next){

	var token = randomstring.generate();

	User.findOne({"contact.email" :email})
		.exec((err,user) =>{
			user.resetPasswordToken = token;
			user.resetPasswordExpires = Date.now() + (60*60*2000) ; 
			user.contact.phone1 = user.contact.phone1 || "2837364462"

			user.save()
			 .then(() => {
				Mailer({
					subject:"Password reset request.",
					recipients:`<${user.contact.email}>`,
					message:format(token, url)
				}, 
				function(err,success){
					if(err) return next(err);
					return next(null, success)
				})
			})
			.catch(err => {if(err) console.error(String(err))}) 
	})
}


