var Registration=require("../models/registration/main")
var Player=require("../models/players/_default");
var Goalie=require("../models/players/_goalie");
var Coach=require("../models/staff/coach");
var Team=require("../models/team")

module.exports=function(app){
    

    
    app.get("/admin/registration/players",function(req,res){
        Registration.findByType("PlayerRegistration",function(err,docs){
            if(err)throw err;
            res.render("team_picker",{player:docs})
        })
    })
    
    app.get("/admin/registration/coaches",function(req,res){
        Registration.findByType("CoachRegistration",function(err,data){
            if(err)throw err;
            data.forEach(function(v){
                if(v.coaching_info.preferred_coaching_positions[0].includes("__other")){
                    v.alternative_position=v.coaching_info.preferred_coaching_positions[0].split(":")[1]
                }
            })
            res.render("coach_picker",{coaches:data})
        })
    }) 

    app.post("/admin/submit/player/default",function(req,res){
        var id=req.query.id;
        
        Registration.submit(id,req.body,"players",Player)
        res.send("Player submitted");
    })
    app.post("/admin/submit/player/goalie",function(req,res){
        var id=req.query.id;
        Registration.submit(id,req.body,"goalies",Goalie)
        res.send("Goalie submitted");
    })
    
    app.post("/admin/submit/coach",function(req,res){
        var id=req.query.id;
        Registration.submit(id,req.body,"coach",Coach);
        res.send("Coach submitted");
    })
    
    app.get("/admin/roster",function(req,res){
        Team.findOne({division:"Junior's",name:"U16"}).populate("players goalies coach")
          .exec(function(err,doc){
            if(err) throw err;
            var players=doc.goalies.concat(doc.players);
            res.render("team_spreadsheet",{players:players,coach:doc.coach,team:doc})
        })
    })
}