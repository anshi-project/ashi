var Record = require("../../locals/records");

module.exports = function(app) {
	app.get("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;

		if (!id) {
			return res.redirect("/admin/index")
		}
		Record.render(type,id,function(error,fields, doc){
			if(error) throw error;

			var title = doc.firstname +" "+ doc.lastname
		
			res.render("records", {userType:"admin",layout:"user",fields, title, id,type})
		})
	})


	app.put("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;
		var messages = [];
		var team_update = req.query.teamUpdate

		if(team_update){
			Record.handleTeamChange(type, id, req.query.teamUpdate, req.body, function(err,data){
				if(err) return res.send("Error updating team/division of " + id).status(500)
			    console.log("Team updated");
			})			
		}
			Record.handleUpdate(type,id,req.body, function(err){
		 		if(err) throw err;
		 		res.send("Updated I think")
			})	
	})
}