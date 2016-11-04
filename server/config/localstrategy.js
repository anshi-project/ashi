var passport=require("passport");
var LocalStrategy = require('passport-local');
var User=require("../models/staff/main")

module.exports= new LocalStrategy(function(username, password, done) {
	
  User.findOne({ username: username,status:"Active"}, function (err, user) {
    
  		if(err) { 
  			return done(err); 
  		}
  		if(!user) {
    		return done(null, false);
  		}

  		user.comparePassword(password,user.password,function(err,success){		
        if(err) return done(err);
  		
  			if(success){
  				return done(null,user);
  			}else{
  				return done(null, false);		
  			}
		})
	});
	}
);
