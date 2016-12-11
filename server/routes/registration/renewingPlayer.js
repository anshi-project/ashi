var Player=require("../../models/players/main");

module.exports=function(app){
    
    app.get("/register/renew/player",function(req,res){
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields("returningPlayer");
        var error = req.query.redirect;
        var success = req.query.success;

        res.render("form",{fields,layout:"registration",type:"renew/player",returningPlayer:true,error,success});
    })

    app.post("/register/renew/player",function(req,res){
        var _=req.body;
        var firstname = new RegExp(_.firstname, "i");
        var lastname = new RegExp(_.lastname, "i");
        var email = new RegExp(_.contact.email, "i");

        var query={
            firstname,
            lastname,
            // status:"archived",
            "contact.email":email
        }

        Player.findOne(query,function(err,player){
            if(err || !player){
                console.log(String(err))
                return res.redirect("/register/renew/player?redirect=error")
            }else{
                player.status="renewing membership";
                player.hockey_info.position = _.position;
                player.hockey_info.team = _.team;
                player.save()
                .then(()=>{ res.redirect("/register/renew/player?success=true") })
                .catch(err =>{ if(err){ console.error(String(err))} })
                
            }
        })
    }) 
}