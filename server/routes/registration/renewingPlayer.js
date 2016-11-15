var Player=require("../../models/players/main");
var sendToSpreadSheet=require("../../config/export/google_spreadsheet");

module.exports=function(app){
    app.get("/register/player/renew",function(req,res){
        res.render("reg/returning",{layout:"main"})
    })


    app.post("/register/player/renew",function(req,res){
        var _=req.body;
        var query={firstname:_.firstname,lastname:_.lastname,"contact.email":_.email}

        Player.findOne(query,function(err,player){
            if(err || !player){
                return res.send("There is no record of a player with that name and/or email").status(500);
            }else{
                player.status="renewing membership";
                player.save();
                res.render("reg/success");    
            }
        })
    }) 
}