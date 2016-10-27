var formProcessor=require("form-data-to-object").toObj;
var sendToSpreadSheet=require("../../config/export/google_spreadsheet")
var path=require("path");

module.exports=function(app){
    app.get("/register/:type",function(req,res,next){
        var type=req.params.type;
        var locals=Object.assign({},app.locals,
            {type:type,layout:"registration",action:type,className:"registration-form"});
        res.render("reg/"+type,locals );
    })
    
    app.post("/register/:applicationType",function(req,res){
        var type=req.params.applicationType;
        var form=formProcessor(req.body);
        var Registration=require("../../models/registration/_"+type+"Reg");

        Registration.create(form,function(err,doc){
            if(err) throw err;
            sendToSpreadSheet(type,doc,function(e,d){
                res.render("reg/success")    
            })    
        })
    })  
}