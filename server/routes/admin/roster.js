var Team=require("../../models/team/team");


function sortByJersey(a,b){
  if(+a.team.jersey_number>+b.team.jersey_number) return 1;
  if(+a.team.jersey_number<+b.team.jersey_number) return -1;
  return 0;  
}

module.exports=function(app){
	
  app.get("/admin/roster",function(req,res){
      Team.find({},"name key",function(e,d){
        res.render("admin/roster/list",{team:d})
      })
  })

  app.get("/admin/roster/:teamKey",function(req,res){
		Team.findOne({key:req.params.teamKey},"name players goalies coaches")
      .populate({
        path:"players goalies",
        select:"lastname firstname public_data registration.bio.hometown registration.apparel team"
      })
      .populate("coaches")
      .exec(function(err,docs){
        if(err)throw err;  
        var players=docs.players.concat(docs.goalies).sort(sortByJersey);
         res.render("admin/roster/team",{coaches:docs.coaches,players:players,team:docs.name})
		})
	})

  app.get("/admin/db/:dbRoute/:type/:ID",function(req,res){
    var dbRoute=req.params.dbRoute;
    var type=req.params.type;
    var Member=require("../../models/"+dbRoute+"/"+type);

    Member.findById(req.params.ID,function(err,doc){
      if(err)throw err;
      res.send(doc);
    })
  })

}

