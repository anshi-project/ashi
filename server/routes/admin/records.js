var Record = require("../../locals/records");

function notEqual(a,b,options){
  if(Array.isArray(b) && b.indexOf(a)==-1 || !Array.isArray(b) && a !== b) {
    return options.fn(this);
  }
  return options.inverse(this);
}

function isEqual(a,b,options){
  if(a == b) {
    return options.fn(this);
  }
  return options.inverse(this);	
}

module.exports = function(app) {
	app.get("/admin/records/:type", function(req, res) {
		var type = req.params.type;
		var id = req.query.id;

		if (!id) {
			return res.redirect("/admin/index")
		}
		Record.render(type,id,function(error,fields,fields2, doc){
			if(error) throw error;
			req.session.memberRecord = doc;
			var person = doc.firstname +" "+ doc.lastname
			
			res.render("records", {fields, fields2, person, id,type, helpers:{notEqual,isEqual}})
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