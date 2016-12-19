var Player=require("../../models/players/main");

module.exports=function(app){
    
    app.get("/register/renew/player",function(req,res){
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields("returningPlayer");
        var error = req.query.error;
        var success = req.query.success;

        res.render("form",{fields,layout:"registration",type:"renew/player",returningPlayer:true,error});
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

        Player.renewMembership(query, req.body, (err,success) =>{
            if(err) return res.redirect("/register/renew/player?error="+String(err))
             res.redirect("/submitted");   
        })
        
    }) 
}