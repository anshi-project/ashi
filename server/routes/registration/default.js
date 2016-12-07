var player = require("../../models/registration/_playerReg");
var coach = require("../../models/registration/_coachReg");
var StaffMember = require('../../models/staff/main');

var models = {player , coach }



module.exports=function(app){
      app.get("/register/:type",function(req,res){
        var type = req.params.type;
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields(type);
        var token = req.query.token? "?token="+req.query.token : ""
        var admin = fields.admin? true: false;
        res.render("form",{fields,layout:"registration",type, admin, token, success:req.query.success});
    });

    app.post("/register/:type",function(req,res,next){
        var type = req.params.type;
        var token = req.query.token;
        var now = new Date();
        console.log(type +  ' registration form submitted')

        var __t = type.charAt(0).toUpperCase() + type.substr(1).toLowerCase();
        var query = {regToken:token,regTokenExp:{$gt:now},__t };
        var form = Object.assign({},req.body)

        if(type != "admin" && type != "manager" ) return next();

        StaffMember.findOne(query).exec(function(err,doc){
            if(err || !doc) return res.redirect("/register/"+type+"?error=TRUE")

            for(var field in form){
                if(typeof field === "object"){
                    doc[field] = Object.assign({}, field)
                }else{
                    doc[field] = form[field]
                }
            }
            doc.save()
            .then(()=> {res.redirect("/register/manager?success=true")})
            .catch((err)=> { if(err) {
                console.log(err);
                // res.send(String(err))
              }
            })
        })

    });

    app.post("/register/:type",function(req,res,next){
        var type = req.params.type;

        if(type != "next" && type != "player" ) return next();

        var Registration = models[req.params.type];

        Registration.create(req.body,function(err,doc){
            if(err){
                console.log(err.ValidationError);
                res.send(console.error(String(err)));
            }
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
