module.exports = function(app){

	 app.post("/message",function(req,res,next){
    	var sendMessage = require("../config/nodemailer");
    	var cc = req.user.contact.email;

    	if(!req.user) return res.status(401).send("Forbidden route");

    	sendMessage(req.body, function(err,info){
    		if(err) return res.status(500).send("An error occured while sending your emails. Please try again");

    		res.send("gfgdfgd")
    	});   
    })
}