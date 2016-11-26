module.exports = function(app){

	 app.post("/message",function(req,res){
    	var sendMessage = require("../config/nodemailer");
    	var cc = req.user.contact.email;

    	sendMessage(req.body);
	
    	res.send(req.body);    
    })
}