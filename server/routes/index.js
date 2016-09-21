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
    
    
    app.get("/stats",function(req,res){
        Player.find({},function(e,d){
            res.send(d)
        })
    })
    

    
    app.get("/scorecard",function(req,res){
        var teams=req.session.teamData.map(function(v){
            return v.name;
        })
        var d=new Date();
        var date=d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear()
        res.render("scorecard",{teams:teams,currentDate:date}); 
    })
    
    app.post("/register/player",function(req,res){
       Player.create(req.body,function(err,doc){
           if(err) return res.send(err.message);
           res.send(doc);
       }); 
    });    
};

 