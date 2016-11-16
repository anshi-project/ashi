var Player=require("../../models/players/main")


module.exports=function(app){

	app.get("/api/player",function(req,res){
		var fields = "-contact -apparel -paid -headshot -_id -__v -__t -createdAt -hockey_info.jersey_number -updatedAt"
		var id = req.query.id  
		var query = id? {_id:id} : {};

		Player.find({} ,"hockey_info").exec(function(e,d){
			res.send(d)
		})
	})
}
