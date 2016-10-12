var Registration=require("../models/registration/main");
var Player=require("../models/players/_default");
var Goalie=require("../models/players/_goalie");
var Coach=require("../models/staff/coach");
var Team=require("../models/team/team")

module.exports=function(app){
    
    app.get("/admin/assign/players",function(req,res){
        Registration.findByType("PlayerRegistration",function(err,docs){
            if(err)throw err;
            res.render("team_picker",{player:docs})
        })
    })
    
    app.get("/admin/assign/coaches",function(req,res){
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

    app.post("/admin/submit/new/:type",function(req,res){
        var id=req.query.id;
        var type=req.params.type;
        var modelInstance=Player;
        
        if(type=="goalies") modelInstance=Goalie;
        
        Registration.submit(id,req.body,type,modelInstance)
        res.send("Player submitted");
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
    
    app.get("/admin/applications/pending/player",function(req,res){
        Registration.find({__t:"PlayerRegistration",registration_status:"pending"},function(err,docs){
            if(err) throw err;
            res.render("admin/registered_users/applicant_list",{applicants:docs})
        })
    })
    app.get("/admin/applications",function(req,res){
        Registration.findById(req.query.id,function(err,doc){
            if(err)throw err;
            res.render("admin/registered_users/PlayerRegistration",doc)
        })
    })
    
}