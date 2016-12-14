module.exports = function(app){

	 app.post("/message",function(req,res,next){
    	var sendMessage = require("../config/nodemailer");
    	var cc = req.user.contact.email;

    	if(!req.user) return next()

    	sendMessage(req.body, function(err,info){
    		if(err) return res.send("An error occured while sending your emails. Please try again").status(500);

    		res.send(info)
    	});   
    })
}