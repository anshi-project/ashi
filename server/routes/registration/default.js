var player = require("../../models/registration/_playerReg");
var coach = require("../../models/registration/_coachReg");
var StaffMember = require('../../models/staff/main');

var models = {player , coach }



module.exports=function(app){
    
    app.all(/\/register\/(?=\badmin\b|\bmanager\b)/,function(req,res,next){
        var token = req.query.token;
        var now = new Date()
        var type = req.originalUrl.match("admin")? "admin" : "manager";

        if(req.query.success || req.query.error) return next();
        //disregard token check when form was successfully submitted or an error with a submission occurred;

        StaffMember.findOne({regToken: token, regTokenExp:{$gt:now}})
            .then(user => {
                if(!user) return res.send("You don't have the proper credentials for this route, or it is from an expired session");
                req.session.regToken = `?token=${token}`;
                req.session.regType = type;

                if(req.body && req.body.password){
                    user.status = "pending";
                    user.password = req.body.password;
                    user.regTokenExp = now;
                    user.save()
                        .then(() => { return next()})
                        .catch(err => {console.error(String(err))})
                } //if POST request, save the password here. The hook which encrypts the password wont be
                //set off on by updating the user which is what will take place on the actual POST route
                //because it is more effiecent than retrieving this DB entry twice
                else{
                    return next()
                }
            })
    })//If a user is trying to access a registration form for an admin or GM, make sure they have a valid token



    app.get("/register/:type",function(req,res){
        var type = req.params.type;
        var getFields = require("../../locals/registration").renderForm;
        var fields = getFields(type);
        var token = req.session.regToken || ""
        var admin = fields.admin? true: false;
        
        res.render("form",{fields,layout:"registration",type, admin, token, error:req.query.error, success:req.query.success});
    });



    
    app.post(/\/register\/(?=\badmin\b|\bmanager\b)/,function(req,res,next){
        var type = req.session.regType;
        var token = req.query.token;

        var query = {regToken:token};

        var form = Object.assign({},req.body)

        delete form.password;
        //delete password so the previously applied encryption from the middleware is not overwritten

        StaffMember.update(query, form, {upsert:true})
            .then(() => { 
                res.redirect(`/register/${type}?token=${token}&success=true`)
            })
            .catch(err => {if(err) res.redirect(`/register/${type}?token=${token}&error=${String(err)}`)})

    });

    app.post("/register/:type",function(req,res,next){
        var type = req.params.type;
        if(type != "player" && type !== "coach" ) return next();
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
