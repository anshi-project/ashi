var Player=require("../models/registration/_playerReg");
var Coach=require("../models/registration/_coachReg");
var GM=require("../models/registration/_managerReg")
var format=require("./helpers/formProcessor");

var locals=require("./seed")
var _states=locals.states;
var _heights=locals.heights;

module.exports=function(app){
    
    app.get("/register/player",function(req,res){
        res.render("registration",{states:_states,height:_heights})
    })
    
    app.get("/register/coach",function(req,res){
        res.render("coach_registration",{states:_states, action:"/register/coach"})
    })

    app.get("/register/manager",function(req,res){
        res.render("manager_registration")
    })    
 
    app.post("/register/coach",function(req,res){
        var fields=format(req.body,"coach");
        Coach.create(fields,function(e,d){
            res.send(d);
        })
    })    
    
    app.post("/register/manager",function(req,res){
        var fields=format(req.body,"manager");
        
        GM.create(fields,function(e,d){
            
            res.send(d);
        })
    })
    
    app.post("/register/player",function(req,res){
        var formSubmission=format(req.body,"player");
        Player.create(formSubmission,function(e,d){
            res.send(d);
        })
    })
}


    // app.get("/admin/test",function(req,res){
    //     res.render("returning_player_registration")
    // })
    
    // app.post("/admin/test",function(req,res){
    //      var Player=require("../models/players/main");
    //      var query={"registration.public_data.lastname":req.body.lastname,
    //                 "registration.public_data.firstname":req.body.firstname,
    //                 "registration.public_data.email":req.body.email}
        
    //      Player.findOne(query,function(err,doc){
    //          if(err) throw err;
    //          doc.registerForNewSeason();
    //          res.send(doc);
    //      })
    // })