var Team = require("../../models/team/team");
var writeFile = require("../../locals/rosterDownload");
var Player = require("../../models/players/main")
var _ = require("lodash");

function randomDate(){
    return _.random(1,12)+"/"+_.random(1,31)+"/"+_.random(1970,2000);
}

function valiDATE(){
  var str = randomDate();
  var date = new Date(str);

  while(date == "Invalid Date"){
    str = randomDate();
    date = new Date(str);
  }
  return str;
}

module.exports=function(app){
	
  app.get("/admin/roster",function(req,res){
  
    var select= "firstname contact paid headshot public_data lastname team";  
    var match = {status:{$in:["Active"]}}

    Team.find({},"key name division archive players goalies coaches managers")
      .sort({"name":-1})
      .populate({path:"players coaches goalies managers",match, select})
      .exec(function(err,teams){    
        if(err) throw err;
             
        res.render("admin/roster/team",{teams,userType:"admin",
          email:req.user.contact.email, layout:"user"});
      })
	})

  app.put("/admin/roster",function(req,res){     
      Player.updatePayments(req.body, function(err,data){
        if(err) return res.send("Something went wrong").status(500);
        res.send(data).status(200);
    })  
  })

  app.get("/fix/database",function(req,res){
    var getDivision = require("../../locals/fields/teams").getDivision;
    var teams = require("../../locals/fields/teams").names

    Player.find({"team.name":{$in:["Men's Master's Team USA"]}},
      "contact team public_data").exec(function(e,docs){
        
        docs.forEach(function(player){

           //  player.contact.phone1 = _.random(1000000000, 9999999999)
           //  player.contact.phone2 = _.random(1000000000, 9999999999)
           // player.markModified("contact");
           // player.markModified("team"); 
           player.save() 
        })
        res.send(docs)
    })
  })

  app.get("/admin/roster/:key/export",function(req,res,next){

    var key = req.params.key;
    var val = req.query.q
    var filename = val? val+".xlsx" : "ASHI-Players.xlsx"
    var query = {};

    if(key != "all"){
      query["team."+key] = val; 
    }
  

    Player.find(query)
      .sort({lastname:1})
      .exec(function(err,docs){
        if(err) throw err;

        if(!docs.length){ 
          return res.send(query).status(404);
        }
        writeFile(docs,function(err,file){
          if(err) throw err;
          res.download(file, filename, err=>{if(err) throw err;});
        })
      })
  })
}



           //  var p = player.public_data;
           //  var t = player.team;

           //  player.team.shooting_hand=t.shooting_hand? _.capitalize(t.shooting_hand) : "Left";
           //  player.team.jersey_number = t.jersey_number? t.jersey_number : _.random(0,99);
           //  player.team.division = t.division? t.division : getDivision(t.name)
           //  player.team.position = t.position.map(function(v){
           //    v = v.split(" ");
           //    if(v[1]) v[1] = _.capitalize(v[1])
           //    return v.join(" ").trim()  
           //  })  
           //  if(p.hometown) delete player.public_data.hometown;
           //  if(t.name == "u18") player.team.name = "U18";
           //  player.public_data.date_of_birth = valiDATE();
           //  player.public_data.gender = p.gender? _.capitalize(p.gender) : "Male";
           //  player.public_data.weight = _.random(100,250)
