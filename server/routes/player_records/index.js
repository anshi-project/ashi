var Player=require("../../models/players/main")
var Team=require("../../models/team/team")


module.exports=function(app){

	app.get("/admin/api/search",function(req,res){
		var teams=require("../../locals/fields/teams").names;
		res.render("api",{layout:"user",teams})
	})


	app.get("/admin/api/player",function(req,res){
		var fields = "-contact -apparel -paid -headshot -_id -__v -__t -createdAt -hockey_info.jersey_number -updatedAt"
		var q = req.query;

		if(q.id && q.registration){
			query = {_id:q.id}
			fields = "";
		}else{
			query = {firstname:q.firstname.toLowerCase(),lastname:q.lastname.toLowerCase(), "team.jersey_number":q["team.jersey_number"]}
		}


		Player.findOne(query, fields).exec(function(err,player){
			if(err || !player){
				return res.send("Player not found.")
			}else{
				return res.send(player)
			}
		})
	})

	app.get("/admin/api/team",function(req,res){
		
		var query = req.query;

		Team.findOne(query)
		.populate({
			path:"players goalies coaches managers",
			select:"fullname firstname lastname team",
			match:{status:"Active"}
		})
		.exec(function(err,team){
			if(err ){
				return res.send("Player not found.")
			}else{
				res.send(team)
			}
	})


})
}
