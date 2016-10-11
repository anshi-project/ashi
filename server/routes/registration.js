var Registration=require("../models/registration/main");
var Player=require("../models/players/main");
var format=require("./helpers/formProcessor");
var locals=require("./helpers/locals")

module.exports=function(app){

    app.get("/register/:type",function(req,res,next){
        var type=req.params.type;
        var currentPart= Number(req.query.part)||1;
        var completed;
        
        req.session.formData=req.session.formData||{};
        req.session.locals=req.session.locals||Object.assign(locals,{type:type})
        completed=req.session.formData.completed||1;
        
        if(!currentPart|| currentPart>completed){
          return res.render("reg/"+type+"/part1",locals);
        }
        res.render("reg/"+type+"/part"+currentPart, locals)
    })//url queries allow for reloading previously completed form sections but won't let users skip sections
    

    app.post("/register/:type",function(req, res) {
        var type=req.params.type;
        var nextPart= Number(req.query.part);
        var completed={completed:Math.max(req.session.formData.completed,nextPart)};
        
        req.session.formData=Object.assign(req.session.formData,req.body,completed)
         
        return res.render("reg/"+type+"/part"+nextPart,req.session.locals);
    })// as sections of the form are submitted, the body of the form are compiled into an object that is stored in req.session
 
    app.post("/register/submit/:applicationType",function(req,res){
        var type=req.params.applicationType;
        var formData=Object.assign({},req.session.formData,req.body);
        var fields=format(formData,type);
         
         Registration.handleFormSubmission(fields,type,function(e,d){
            res.render("reg/thankyou");
        })
    })  
    
    app.get("/register/player/renew",function(req,res){
        res.render("reg/returning")
    })
    
    app.post("/register/player/renew",function(req,res){
        Player.findByName(req.body,function(err,player){
            if(err) throw err;
            player.registerForNewSeason();
            res.render("reg/thankyou");
        })
    }) 

}