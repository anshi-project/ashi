var sendToSpreadSheet=require("../../config/export/google_spreadsheet")

module.exports=function(app){
    app.get("/register/:type",function(req,res,next){
        var type=req.params.type;
        var locals=Object.assign({},app.locals,
            {type:type,layout:"registration",action:type});
        res.render("reg/"+type,locals );
    })

    app.post("/register/player",function(req,res){       
        var Registration=require("../../models/registration/_playerReg");

        Registration.create(req.body,function(err,doc){
            if(err) throw err;
            sendToSpreadSheet("player",doc,function(e,d){
                res.render("reg/success")    
            })    
        })
    })
    
    app.post("/register/coach",function(req,res){       
        var Registration=require("../../models/registration/_coachReg");

        Registration.create(req.body,function(err,doc){
            if(err) throw err;
            sendToSpreadSheet("coach",doc,function(e,d){
                res.render("reg/success")    
            })    
        })
    })    

    app.post("/register/:type",function(req,res){
        var type=req.params.type;
        var User=require("../../models/staff/"+type);

        User.create(req.body,function(e,d){
            res.render("reg/success");
        })
    })  
}