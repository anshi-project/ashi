var player = require("../../models/registration/_playerReg");
var coach = require("../../models/registration/_coachReg");
var manager = require("../../models/staff/manager");
var admin = require("../../models/staff/admin");

var models = {player , coach , manager , admin}

module.exports=function(app){

    app.get("/register/:type",function(req,res){
        var type = req.params.type;
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields(type);
        res.render("form",{fields,layout:"registration",type});
    })

    app.post("/register/:type",function(req,res){
        var Registration = models[req.params.type];
        console.log(req.body);
        Registration.create(req.body,function(err,doc){
            if(err) throw err;
            res.render("index")
        })
    })
}
