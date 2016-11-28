var Player=require("../../models/players/main");

module.exports=function(app){
    app.get("/register/renew/player",function(req,res){
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields("returningPlayer");
        var error = req.query.redirect;
        
        res.render("form",{fields,layout:"registration",type:"renew/player",returningPlayer:true,error});
    })

    app.post("/register/renew/player",function(req,res){
        var _=req.body;
        var query={
            firstname:_.firstname.toLowerCase(),
            lastname:_.lastname.toLowerCase(),
            "contact.email":_.contact.email.toLowerCase()
        }

        Player.findOne(query,function(err,player){
            if(err || !player){
                return res.redirect("/register/renew/player?redirect=error")
            }else{
                player.status="renewing membership";
                player.save();
                res.render("index");    
            }
        })
    }) 
}