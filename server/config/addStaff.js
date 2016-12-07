var randomstring = require("randomstring");
var Mailer = require("./nodemailer")

var token = randomstring.generate();

var formatMessage = function(type){
	return "Please follow the link below and fill out the short form to be given A.S.H.I. credentials.\n "+
			'http://localhost:3000/register/'+type+"?token="+token
} 



var defaultUserObj = function(email){
	var exp = new Date()
	exp.setDate(exp.getDate() + 7)
	
	return {
		firstname:"firstname",
		lastname:"lastname",
		contact:{
			email, 
			phone1:"5555555555",
			passport:"No"
		},
		apparel:{
			shirt:"S",
			hat:"S/M",
			jacket:"XL",
			polo:"S"
		},
		username:randomstring.generate(),
		regToken:token,
		regTokenExp:exp
	}
}


module.exports = function(type, email, next){
	var User = require("../models/staff/main")
	var UserOfType = require("../models/staff/"+type)

	User.findOne({"contact.email":email}).exec(function(err,doc){
		
		if(err) {
			console.log(err)
			return next(err)
		}
		else if(doc){
			
			return next("A user with this email already exists.")
		}else{
			var message = formatMessage(type);
			var defaultData = defaultUserObj(email);
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
					if(err) return next(err)
					return next(null, info)	
				})
			.catch(err=> {if(err) return callback(String(err))})	
			})
		}
	}) 
}


