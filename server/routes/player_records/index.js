// var Player=require("../../models/players/main")
// var mapPlayersValuesToFields=require("../../userRecordFields.locals");

// module.exports=function(app){

// 	app.get("/admin/records",function(req,res){
// 		Player.find({},"firstname lastname").sort({"lastname":1})
// 			.exec(function(e,d){
// 			res.render("profile/list",{records:d})
// 		})
// 	})


// 	app.get("/admin/records/player",function(req,res){
		
// 		var id=req.query.id;

// 		if(!id){
// 			return res.redirect("/admin/records")
// 		}

//         Player.findById(id,function(e,doc){
//         	var fields=mapPlayersValuesToFields("player",doc);
//             res.render("profile/admin",{fields,id})
//         })
// 	})

// 	app.post("/admin/records/player",function(req,res){
// 		var id=req.query.id;
// 		Player.findById(id).update(req.body).exec(function(e,d){
// 			if(e)throw e;
// 			res.redirect("/admin/records");
// 		})

// 	})
// }
