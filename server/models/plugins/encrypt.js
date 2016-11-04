var bcrypt=require('bcrypt-nodejs');

module.exports=function(schema){

    schema.pre('save', function(next) {
      var user = this;
      
      if(user.__t=="coach"){
        return next();
      }

      bcrypt.genSalt(10, function(err, salt) {
        if (err) { 
            return next(err); 
        }
    
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) { return next(err); }
          user.password = hash;
          next();
        });
      });
    });    
}

