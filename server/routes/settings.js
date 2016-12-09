var Record = require("../locals/records")
var User = require("../models/staff/main");

module.exports = function(app){
	

	app.get("/settings",function(req,res,next){
		if(!req.user) return next();
		
		var id = req.user._id;
		var type = req.user.__t.toLowerCase();
			
		Record.render(type,id, function(error,fields, doc){
			if(error) throw error;

			var title = "Update your info"
	
			res.render("records", {userType:type, layout:"userRecords",fields, title, id,type})
		})
	})

	
	app.get("/account/reset", function(req,res){
		var error = req.query.error;
		var success = req.query.confirmed
		res.render("password_reset",{error,success})
	})

	
	app.get("/account/reset/:token",function(req,res){
		
		var token = req.params.token;
		var now = Date.now();

		User.findOne({resetPasswordToken:token},function(err,doc){
			if(!doc){
				res.send("Invalid Token Provided");
			}
			else if(Date.parse(doc.resetPasswordExpires) > now){
				res.render("newPassword", {token})
			}else{
				res.send("This session has expired");
			}

		})
	})

	app.post("/account/reset",function(req,res){
		var Reset = require("../config/reset");
		var queryStr;
		var url = req.protocol + '://' + req.get('host');

		
		Reset(req.body.email , url , function(err,user){
			queryStr = err? "error=invalidEmail":"confirmed=true"
			res.redirect(`account/reset?${queryStr}`) 
		})	
	}) //User sent a request for a password - reset link

	app.put("/account/reset/:token",function(req,res){
		var token = req.params.token;
		var password = req.body.password;
		var now = new Date();

		User.findOne({resetPasswordToken:token, resetPasswordExpires:{$gt:now}})
			.then((user) =>{
				user.password = password;
				user.resetPasswordExpires = now;
				user.save()
			})
			.then(()=>{res.redirect("/login?success=true")})
			.catch((err) => {if(err) console.error(String(err))})
	})
}