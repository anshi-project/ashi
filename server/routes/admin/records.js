var Record = require("../../locals/records");

module.exports = function(app) {
	app.get("/admin/records/:type", function(req, res, next) {
		var type = req.params.type;
		var id = req.query.id;

		if (!id) {
			return res.redirect("/admin/index")
		}
		Record.render(type,id,function(error,fields, doc){
			if(error) return next({status:404})

			var title = doc.firstname +" "+ doc.lastname
		
			res.render("records", {userType:"admin",layout:"userRecords",fields, title, id,type})
		})
	})

	app.put("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;
		var team_update = req.query.teamUpdate

		if(team_update){
			Record.handleTeamChange(type, id, team_update, req.body, function(err,data){
				if(err) return res.status(500).send(err)
					res.send(data)
			})			
		}else{
			Record.handleUpdate(type,id,req.body, function(err,message){
		 		if(err) return res.status(500).send(String(err));
		 		res.send(message)
			})	
		}
	})
}