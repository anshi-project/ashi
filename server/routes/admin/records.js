var Record = require("../../locals/records");

module.exports = function(app) {


	app.get("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;

		if (!id) {
			return res.redirect("/admin/index")
		}

		Record.render(type,id,function(error,fields,doc){
			if(error) throw error;
			req.session.memberRecord = doc
			res.render("records", {fields,id,type})
		})

	})



	app.put("/admin/records/:type", function(req, res) {
		var recordBeforeUpdate = req.session.memberRecord;
		var type = req.params.type;
		var id = req.query.id;

		var HandleUpdate = Record.handleUpdate(type, id, recordBeforeUpdate);
		
		HandleUpdate(req.body, function(err){
		 	if(err) throw err;
		 	delete req.session.memberRecord;
		 	res.send(recordBeforeUpdate)
		})	
	})
}