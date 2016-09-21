var Player=require("../models/registration");
var Team=require("../models/team")
var Stats=require("../models/playerStats");

module.exports=function(app){
    
    app.use("/",function(req,res,next){
        if(req.session.teamData){
            return next();
        }else{
            Team.find({})
                .populate("players")
                .exec(function(e,d){
                        req.session.teamData=d;
                        next();
            })            
        }
    })//Adds all team data on the disk    
    
     app.get("/",function(req,res){
        res.render("registration")
    })
    
    app.get("/players",function(req,res){
        res.send(req.session.teamData);
    });
    
    app.get("/seed",function(req,res){
       var player=new Player({lastname:"Millar",firstname:"Kevin","hockey_registration_info": {team: "Boston Bruins"}})
       player.save(function(e,d){
           if(e)throw e;
           res.send(player)
       });
       
    });
    
    app.get("/stats",function(req,res){
        Player.find({},function(e,d){
            res.send(d)
        })
    })
    
    app.get("/team",function(req,res){
        Team.create({name:"Boston Bruins", players:["57e1a8d313d9bddcd6082e17","57e1a89ee113cbd85fee9418","57e1a875f6a567d3e6396bc9"]})
        res.send("done")
    })
    
    app.get("/scorecard",function(req,res){
        var teams=req.session.teamData.map(function(v){
            return v.name;
        })
        res.render("scorecard",{teams:teams}); 
    })
    
    app.post("/register/player",function(req,res){
       Player.create(req.body,function(err,doc){
           if(err) return res.send(err.message);
           res.send(doc);
       }); 
    });    
};

 