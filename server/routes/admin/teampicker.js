var Registration=require("../../models/registration/main");
var _=require("lodash");

function getDivision(name,teams){return _.find(teams,v=>{return v.name==name}).division; }

module.exports=function(app){
    
    app.get("/admin/assign/player",function(req,res){
        Registration.findRegisteredPlayers(function(player){ 
            res.render("admin/teampicker/player",{player,layout:"spreadsheet"});
        })
    })

    app.get("/admin/assign/coach",function(req,res){
        var Coaches=require("../../models/registration/_coachReg");
        Coaches.find({},function(err,coach){
            if(err)throw err;
            res.render("admin/teampicker/coach",{coach,layout:"spreadsheet"})
        })
    })

    app.post("/admin/assign/returning-player",function(req,res){
        var id=req.query.id;
        var Player=require("../../models/players/main");

        Player.reassign(id,req.body);

        res.send(req.body);
    })

    app.post("/admin/assign/coach",function(req,res){
        var id=req.query.id;
        var division=getDivision(req.body.name,app.locals.teams);
        var team=Object.assign(req.body,{division});
        
        Registration.assignCoach(id,{team},function(err){
            if(err) throw err;
            res.send("Successfully added")
        });
    }) 
    
    app.post("/admin/assign/player",function(req,res){
        var id=req.query.id;
        var division=getDivision(req.body.name,app.locals.teams);
        var team=Object.assign(req.body,{division});        
        var type=(team.position=="Goalie");

        Registration.assignPlayer(id,team,type,function(data){
            res.send(data);
        })  
    })
    app.delete("/admin/assign",function(req,res){
        var id=req.query.id;

        Registration.findByIdAndRemove(id,function(err){
            if(err) return res.status(500);
            res.send("Successfully deleted application.");
        })
    })

}