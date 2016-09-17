var Player=require("../models/player");

module.exports=function(app){
    app.get("/players",function(req,res){
        Player.find({},function(err,docs){
            if(err) throw err;
            res.json(docs);
        });
    });
    
    app.post("/register/player",function(req,res){
       Player.create(req.body,function(err,doc){
           if(err) return res.send(err.message);
           res.send(doc);
       }); 
    });    
};