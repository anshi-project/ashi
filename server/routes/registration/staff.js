var admin = require("../../models/staff/admin");
var manager = require("../../models/staff/manager");
var StaffMember = require('../../models/staff/main');

var models = {admin, manager}

module.exports=function(app){

    app.post("/admin/")


    app.post("/register/:type",function(req,res){
        var Registration = models[req.params.type];

        Registration.create(req.body,function(err,doc){
            if(err) throw err;
            res.redirect("/register/"+req.params.type+"?success=true")
        });
    });

    app.post("/check-username/:username",function(req,res){
        var username = req.params.username;
        
        StaffMember.find({username: username}, function(err,doc){
            if(err) throw err;
            res.send(doc);
        });
    });
}
