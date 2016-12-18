var Player=require("../../models/players/main")
var Team=require("../../models/team/team")


module.exports=function(app){

	app.get("/admin/api/search",function(req,res){
		var teams=require("../../locals/fields/teams").names;
		res.render("api",{layout:"userRecords", userType:"admin",teams})
	})

	app.get("/admin/api/player-application",function(req,res){
		var id = req.query.player;

		Player.findById(id)
			.then(player => { res.send(player).status(200)})
			.catch(err => { res.send(String(err)) })

	})

	app.get("/api/player",function(req,res){
		var fields = "-contact -apparel -paid -headshot -_id -__v -__t -createdAt -hockey_info.jersey_number -updatedAt"
		var q = Object.assign({},req.query , {__proto__:null});

		if(q.firstname) q.firstname = new RegExp(q.firstname, "i"); 
		if(q.lastname) q.lastname = new RegExp(q.lastname, "i");	

		Player.findOne(q, fields).exec(function(err,player){
			if(err || !player){
				return res.send("Player not found.")
			}else{
				return res.json(player)
			}
		})
	})

	app.get("/api/team",function(req,res){
		
		var query = req.query||{};


		Team.findOne(query)
		.populate({
			path:"players coaches managers",
			select:"fullname firstname lastname team",
			match:{status:"Active"}
		})
		.exec(function(err,team){
			if(err ){
				return res.send("Team not found")
			}else{
				res.json(team)
			}
	})


})
}
