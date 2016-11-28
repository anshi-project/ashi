var randomstring = require("randomstring");
var Mailer = require("./nodemailer")
var User = require("../models/staff/main");

var format = function(token){
	return 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link to set a new login:\n\n' +
          'http://localhost:3000/account/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'	
} 


module.exports = function(email,next){

	var token = randomstring.generate();

	User.findOne({"contact.email" :email}, function(err,doc){
		
		if(err || !doc) return next(true)

			doc.resetPasswordToken = token;
			doc.resetPasswordExpires = Date.now() + (60*60*2000) ; 
			doc.save();
	
		Mailer({
			subject:"Password reset request.",
			recipients:doc.contact.email,
			message:format(token)
		})

		return next(null,doc)

	})
}

