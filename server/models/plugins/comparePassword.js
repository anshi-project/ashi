var bcrypt=require('bcrypt-nodejs');

module.exports=function(schema){
    schema.methods.comparePassword = function(candidatePW,hash,cb){
    	
	    bcrypt.compare(candidatePW,hash,function(err,success){
		    if(err) return cb(err);
		    cb(null,success);
	    })
    }
}
