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

			var person = doc.firstname +" "+ doc.lastname
		
			res.render("records", {userType:"admin",layout:"user",fields, person, id,type})
		})

	})

	app.put("/admin/update/team-records/:type",function(req,res){
		var type = req.params.type;
		var id = req.query.id;
		var update = req.body;

				
		Record.handleTeamChange(type, id, req.body, function(data){
			res.send(data);
		})
	})

	app.put("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;
		
		Record.handleUpdate(type,id,req.body, function(err){
		 	if(err) throw err;
		 	res.send("Updated I think")
		})	
	})
}