var Registration=require("../models/registration/main");

var format=require("./helpers/formProcessor");

var locals=require("./seed").formFields;

module.exports=function(app){
    
    app.get("/register/:type",function(req,res){
        var type=req.params.type;
        res.render("reg/"+type+"/part1",locals);
    })
    
    app.post("/register/form",function(req, res) {
        req.session.formData=req.session.formData||{};
        
        var type=req.query.type;
        var nextPart="/"+req.query.nxt;
        var props=Object.keys(req.body);
        
        props.forEach(function(prop){
            req.session.formData[prop]=req.body[prop]
        })
        
        res.render("reg/"+type+nextPart,locals);
                
    })
 
    app.post("/register/:applicationType",function(req,res){
        var type=req.params.applicationType;
        var fields=format(req.body,type);
         Registration.handleFormSubmission(fields,type,function(e,d){
            res.send(d);
        })
    })    

}