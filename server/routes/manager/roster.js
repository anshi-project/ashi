var Team=require("../../models/team/team");
var writeFile=require("../../config/export/manager_roster/output");
var fs=require("fs");

module.exports=function(app){
	app.get("/gm/roster",function(req,res){
		var fields="-contact.private_data -favorite -career_stats -game_stats -season_stats"
		Team.find({division:req.user.division},"division key name players goalies coaches")
			.populate({path:"coaches players goalies",
					   match:{status:"Active"},
					   select:fields})
			.exec(function(e,d){
				 req.user.teams=d;

				 res.render("manager/roster",{teams:d,layout:"spreadsheet"});
			})			
	})
	app.get("/gm/roster/export",function(req,res){
		var teamData;
		if(req.query.q){
			teamData=req.user.teams.filter(v=>{return v.key==req.query.q});
		}else{
			teamData=req.user.teams;
		}
		writeFile(teamData,function(err,file){
			if(err) throw err;
			res.download(file,"team-data.xlsx",function(err){
				if(err) throw err;
			});
		})
		
	})
}

