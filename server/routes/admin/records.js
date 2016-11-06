var player=require("../../models/players/main")
var coach=require("../../models/staff/coach");
var manager=require("../../models/staff/manager");
var Team=require("../../models/team/team");

var Models={player,coach,manager};

var mapPlayersValuesToFields=require("../../userRecordFields.locals");



module.exports=function(app){

	app.get("/admin/records",function(req,res){
		player.find({},"firstname lastname").sort({"lastname":1})
			.exec(function(e,d){
			res.render("profile/list",{records:d})
		})
	})


	app.get("/admin/records/:type",function(req,res){
		var type=req.params.type;
		var UserModel=Models[type];
		var id=req.query.id;

		if(!id){
			return res.redirect("/admin/records")
		}

        UserModel.findById(id,function(e,doc){
        	var fields=mapPlayersValuesToFields(type,doc);  
            req.session.userRecord={team:doc.team,division:doc.division}
            res.render("profile/admin",{fields,id,type,layout:"spreadsheet"})
        })
	})

	app.put("/admin/records/manager",function(req,res){
		var id=req.query.id;
		var record=req.session.userRecord;
		
		if(record.division!=req.body.division){
			Team.swap({division:record.division},{division:req.body.division},id,"managers");
		}
		manager.findById(id).update(req.body).exec(function(e,d){
			if(e)throw e;
			res.send(d);
		})
	})

	app.put("/admin/records/:type",function(req,res){
		var type=req.params.type;
		var UserModel=Models[type];
		var id=req.query.id;
		var record=req.session.userRecord;
		var body=req.body;
		var category;

		if(type=="player"){
			if(body.team.position=="Goalie"){
				category="goalies"
			}else{
				category="players";
			}
		}else{
			category="coaches";
		}

		if(record.team.name!=body.team.name){
			Team.swap({name:record.team.name},{name:body.team.name},id,category);			
		}// handles the edge case in which the current team is changed on an individuals record 
		 // so the Team model needs to be updated as well 

		UserModel.findById(id).update(req.body).exec(function(e,d){
			if(e)throw e;
			res.send(d);
		})
	})
}