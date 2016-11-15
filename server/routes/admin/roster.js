var Team=require("../../models/team/team");
var writeFile=require("../../locals/rosterDownload");
var Player=require("../../models/players/main")
var _=require("lodash");

module.exports=function(app){
	
  app.get("/admin/roster",function(req,res){
    var division = req.query.division
    var query = division ? {division} : {} ;
    var select= "firstname contact paid background.hometown public_data lastname team";  
    
    Team.find(query,"key name players goalies coaches managers")
      .sort({"name":-1})
      .populate({path:"players coaches goalies managers",match:{status:"Active"}, select})
      .exec(function(e,d){    
        if(e) throw e;           
        res.render("admin/roster/team",{teams:d,layout:"spreadsheet",division , admin:req.user});
      })
	})

  app.get("/admin/roster/download",function(req,res,next){

    var division = req.query.division
    var query = division.length? {"team.division":division} : {};
    var filename = division.length? division+".xlsx" : "ASHI-Players.xlsx"

    Player.find(query)
      .sort({lastname:1})
      .exec(function(err,docs){
        if(err) throw err;

        if(!docs.length){
          return next();
        }
        writeFile(docs,function(err,file){
          if(err) throw err;
          res.download(file, division+".xlsx", err=>{if(err) throw err;});
        })
      })
  })
}




