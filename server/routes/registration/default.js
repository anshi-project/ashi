var player = require("../../models/registration/_playerReg");
var coach = require("../../models/registration/_coachReg");
var manager = require("../../models/staff/manager");
var admin = require("../../models/staff/admin");
var StaffMember = require('../../models/staff/main');

var models = {player , coach , manager , admin}

module.exports=function(app){

    app.get("/register/:type",function(req,res){
        var type = req.params.type;
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields(type);
        var admin = fields.admin? true: false;
        res.render("form",{fields,layout:"registration",type, admin, success:req.query.success});
    });

    app.post("/register/:type",function(req,res){
        var Registration = models[req.params.type];
        Registration.create(req.body,function(err,doc){
            if(err) throw err;
            res.redirect("/register/"+req.params.type+"?success=true")
        });
    });

    app.post("/check-username/:username",function(req,res){
        var username = req.params.username;
        console.log('username: ', username);
        StaffMember.find({username: username}, function(err,doc){
            if(err) throw err;
            res.send(doc);
        });
    });
}
