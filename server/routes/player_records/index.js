var Player=require("../../models/players/main")

module.exports=function(app){

	app.get("/admin/records",function(req,res){
		Player.find({},"firstname lastname").sort({"lastname":1})
			.exec(function(e,d){
			res.render("profile/list",{records:d})
		})
	})


	app.get("/admin/records/player",function(req,res){
		var fn=app.locals.fields;
		var id=req.query.id;

        Player.findById(id,function(e,d){
        	var f=fn(d);
            res.render("profile/admin",{fields:f,id:id})
        })
	})

	app.post("/admin/records/player",function(req,res){
		var id=req.query.id;
		Player.findById(id).update(req.body).exec(function(e,d){
			if(e)throw e;
			res.redirect("/admin/records");
		})

	})
}
