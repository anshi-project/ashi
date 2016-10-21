var Registration=require("../models/registration/main");
var Player=require("../models/players/main");
var locals=require("./helpers/locals")
var formProcessor=require("form-data-to-object");
var objMerge=require("object-assign-deep");

module.exports=function(app){

    app.get("/register/:type",function(req,res,next){
        var type=req.params.type;
        var currentPart= Number(req.query.part)||1;    
        req.session.formData=req.session.formData||{};
        req.session.locals=req.session.locals||Object.assign(locals,{type:type})
        
        var completed=req.session.formData.completed||1;
        
        if(!currentPart|| currentPart>completed){
          return res.redirect("/register/"+type+"?part=1");
        }
        
        res.render("reg/"+type+"/part"+currentPart, locals)
    })//url queries allow for reloading previously completed form sections but won't let users skip sections
    

    app.post("/register/:type",function(req, res) {
        var type=req.params.type;
        var nextPart= Number(req.query.part);
        var completed={completed:Math.max(req.session.formData.completed,nextPart)};
        
        req.session.formData=objMerge(req.session.formData,formProcessor.toObj(req.body),completed)

        return res.render("reg/"+type+"/part"+nextPart,req.session.locals);
    })// as sections of the form are submitted, the body of the form are compiled into an object that is stored in req.session

 
    app.post("/register/submit/:applicationType",function(req,res){
        var type=req.params.applicationType;
         var fields=objMerge(req.session.formData,formProcessor.toObj(req.body))
         
         Registration.handleFormSubmission(fields,type,function(e,d){
            req.session.formData={};
            res.send(d);
            // res.render("reg/thankyou");
        })
        
    })  
    
    app.get("/register/player/renew",function(req,res){
        res.render("reg/returning")
    })
    
    app.post("/register/player/renew",function(req,res){
        var _=req.body;
        var query={lastname:_.lastname,firstname:_.firstname,"public_data.email":_.email}

        Player.findOne(query,function(err,player){
            if(err || !player){
                return res.send("ERROR")
            }else{
                player.status="renewing membership";
                player.save();
                res.render("reg/thankyou");
            } 
        })
    }) 
}