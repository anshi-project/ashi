var Team=require("../../models/team/team");
var Player=require("../../models/players/main");

module.exports=function(app){
	
  app.get("/admin/roster",function(req,res){
  
      Team.find({},"key name players goalies coaches")
          .sort({"name":-1})
          .populate({path:"coaches players goalies"})
          .exec(function(e,d){
             res.render("admin/roster/team",{teams:d,layout:"spreadsheet"});
      })    
	})

  app.get("/admin/db/:dbRoute/:type/:ID",function(req,res){
    var dbRoute=req.params.dbRoute;
    var type=req.params.type;
    var Member=require("../../models/players/_goalie");

    Member.find({},function(err,doc){
      if(err)throw err;
      res.send(doc);
    })
  })

}

