var Record = require("../locals/records")
var User = require("../models/staff/main");

module.exports = function(app){
	

	app.get("/account/settings",function(req,res){
		
		var id = req.user._id;
		var type = req.user.__t.toLowerCase();
			
		Record.render(type,id,function(error,fields, doc){
			if(error) throw error;

			var title = "Update your info"
	
			res.render("records", {userType:type,layout:"user",fields, title, id,type})
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

		Reset(req.body.email, function(err,user){
			queryStr = err? "error=invalidEmail":"confirmed=true";
			res.redirect(`account/reset?${queryStr}`) 
		})
	})

	app.put("/account/reset/:token",function(req,res){
		var token = req.params.token;
		var password = req.body.password;
		var password2 = req.body.passwordConfirm;

		if(password != password2){
			return res.redirect("/account/reset/"+token)
		}

		User.findOne({resetPasswordToken:token},function(err,doc){
			if(err) throw err;

			if(doc){
				doc.password = password;
				doc.resetPasswordExpires = Date.now();
				doc.save();
				res.render("login")
			}else{
				return res.send("error")
			}
				
		})	
			
	})
}