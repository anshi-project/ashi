// var Team=require("../models/team")
// var Player=require("../models/player_registration")
// var Coach=require("../models/coach_registration")
// var _states=require("./seed").states

// module.exports=function(app){
    
//     app.get("/",function(req,res){
//         res.render("registration",{states:_states})
//     })
//     app.get("/register",function(req,res){
//         res.render("coach_registration",{states:_states})
//     })
//     app.post("/register/coach",function(req,res){
//         Coach.create(req.body,function(e,d){
//             res.send(d);
//         })
//     })    
   
    
//     app.get("/menu",function(req,res){
//         var teams=req.session.teamData.map(function(v){
//             return {id:v._id,name:v.division+": "+v.name};
//         })
        
//         res.render("menu",{teams:teams}); 
//     })
    
//     app.get("/create",function(req,res){
//         var home=req.query.homeTeam;
//         var road=req.query.roadTeam;
        
//         Team.find({_id:{$in:[home,road]}}).populate("players").exec(function(err,docs){
//             if(err)throw err;
//             var _home, _away;
//             console.log(docs)
//             docs.forEach(function(doc){
//                 if(doc._id==home){
//                     _home=doc;
//                 }else{
//                     _away=doc;
//                 }    
//             });
//             res.render("scorecard2",{home:_home,away:_away});
//         });
//     });
    
//     app.get("/scorecard",function(req,res){
//         var teams=req.body.teamData.map(function(v){
//             return v.name;
//         });
//         res.render("scorecard",{teams:teams});
//     })
    
//     app.post("/register/player",function(req,res){
//         // var format=require("./helpers/form")
//         // var formSubmission=format(req.body);
//         // console.log(formSubmission)
//         // Player.create(formSubmission,function(e,d){
//         //     console.log(d)
//         //     res.send(d);
//         // })
//         res.send(req.body)
//     })
// }