var Team = require("../../models/team/team");
var writeFile = require("../../locals/rosterDownload");
var Player = require("../../models/players/main")
var _ = require("lodash");
var validateJerseyNumbers = require("../../models/players/methods").validateUniqueJerseyNumbers


module.exports=function(app){
	
  app.get("/admin/roster",function(req,res,next){
    var redirectURL = req.originalUrl + req.path

    var select = "firstname contact paid headshot public_data lastname team hockey_info createdAt";  
    var query = "key name division archive players goalies coaches managers";

    Team.find({}, query)
      .sort({"name":-1}) 
      .populate({path:"players coaches managers",match:{status:"Active"}, select,options:{sort:{"team.jersey_number":1}}})
      .exec(function(err,teams){    
        if(err) return next({status:503,msg:"Something went wrong while trying to retrieve data, please  refresh the page and try again"});

        res.render("admin/roster/team",{teams,userType:"admin", email:req.user.contact.email, layout:"user"});
      })
	})

  app.put("/admin/roster",function(req,res){     
      Player.updatePayments(req.body, function(err,data){
        if(err) return res.send("Something went wrong").status(500);
        res.send(data).status(200);
    })  
  })


  app.get("/admin/roster/:key/export",function(req,res,next){

    var key = req.params.key;
    var val = req.query.q
    var filename = val? val+".xlsx" : "ASHI-Players.xlsx"
    var query = {status:"Active"};
    var teamsInDivion = require("../../locals/fields/teams").getTeamsInDivision;

    if(key == "name"){
      query["team.name"] = val;
    }else if(key == "division"){
      query["team.name"] = {$in: teamsInDivion(val)}
    } 


    Player.find(query).sort({lastname:1})
      .then(docs =>{

        writeFile(docs,function(err,file){
          if(err) throw err;
          res.download(file, filename, err=>{if(err) throw err;});
        })
      })
      .catch(err => {if(err) return next({status:500}) })
  })
}
