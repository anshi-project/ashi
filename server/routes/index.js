
var Team=require("../models/team/team")


module.exports=function(app){
    
    app.use("/",function(req,res,next){
        if(req.session.teamData){
            return next();
        }else{
            Team.find({})
                .populate("players goalies")
                .exec(function(e,d){
                        req.session.teamData=d;
                        next();
            })            
        }
    })//Adds all team data on the disk    
    
    app.get("/",function(req,res){
        res.render("index")
    })
    
    app.get("/players",function(req,res){
        res.send(req.session.teamData);
    });
    
    app.get("/scorecard",function(req,res){
        var teams=req.session.teamData.map(function(v){
            return v.division+": "+v.name;
        })
        res.render("scorecard",{teams:teams}); 
    })
    
}

 