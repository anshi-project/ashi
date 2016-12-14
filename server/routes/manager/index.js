module.exports=function(app){

	require("./roster")(app);

	app.put("/manager/records/manager",function(req,res){
		var User = require("../../models/staff/manager")

		User.findByIdAndUpdate(req.user._id, req.body, {upsert:true}).exec()
			.then(() => {res.send("Successfully updated your profile")})
			.catch(err => {res.send(String(err))})
	})
}