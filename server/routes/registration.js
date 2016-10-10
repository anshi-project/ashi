var Registration=require("../models/registration/main");
var format=require("./helpers/formProcessor");
var locals=require("./seed").formFields;

module.exports=function(app){

    app.get("/register/form/:type",function(req,res){
        var type=req.params.type;
        req.session.formData={};
        req.session.locals=locals;
        req.session.locals.type=type
        res.render("reg/"+type+"/part1",req.session.locals);
    })
    
    app.get("/register/form",function(req,res){
        var currentPart= +req.query.nxt.charAt(4);
        var completed=req.session.formData? req.session.formData.completed:null;
        var type=req.query.type;
      
        if(!completed|| currentPart>completed){
          return res.redirect("/register/form/"+type);
        }
        res.render("reg/"+type+"/part"+currentPart,Object.assign(req.session.locals,req.session.formData))
    })

    app.post("/register/form",function(req, res) {
        var type=req.query.type;
        var nextPart= +req.query.nxt.charAt(4);
        
        req.session.formData=Object.assign(req.session.formData,req.body,{completed:nextPart})
         
        res.render("reg/"+type+"/part"+nextPart,req.session.locals);
                
    })
 
    app.post("/register/form/:applicationType",function(req,res){
        var type=req.params.applicationType;
        var formData=Object.assign({},req.session.formData,req.body);
        var fields=format(formData,type);
         Registration.handleFormSubmission(fields,type,function(e,d){
            res.send(d);
        })
    })    

}