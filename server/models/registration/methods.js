var Team=require("../team/team");
var Player=require("../players/main")
var Coach=require("../staff/coach")

var _=require("lodash");

exports.assignPlayer = function(id,team,playerIsGoalie,callback){   
    var Registration = require("./_playerReg"); 
    var playerType =! playerIsGoalie? "_default":"_goalie";
    var Player = require("../players/"+ playerType);
    var type = playerIsGoalie? "goalies": "players";
    
    Registration.findById(id).lean().exec((err,doc) => {
        if(err)throw err;
        var info = doc.hockey_info;
        var jersey_number = info.jersey_number.choice1;
        var shooting_hand = info.shooting_hand;
        var position = info.position;
        
        var player=_.omit(doc,["_id","__t","__v","createdAt","updatedAt","status"])
            player.team=Object.assign(team,{shooting_hand,jersey_number}); 
            
            Player.create(player,(err)=>{if(err) throw "Error creating new player"} )
            .then( player => { Team.addToRoster({name:team.name},player._id, type) })
            .then(()=> {return callback()})
            .catch( err=>{if(err) throw err; })
    }).then(()=> {
        Registration.findByIdAndRemove(id,function(err){if(err) throw err});
    })
};

exports.assignCoach=function(id,team,callback){
    var Registration=require("./_coachReg");

    Registration.findById(id).lean().exec(function(err,doc){

        var coach=_.omit(doc,["_id","__t","__v","createdAt","updatedAt","status"])
            coach.team=team; 
        Coach.create(coach,(err)=>{if(err) throw "Error creating new coach"})
            .then((coach)=>{Team.addToRoster({name:team.name},coach._id,"coaches")})
            .then(()=> {return callback()})
            .catch((err)=>{if(err) throw err; })
    }).then(function(){        
        Registration.findByIdAndRemove(id,function(err){if(err) throw err});
    })
}



exports.handleFormSubmission=function(fields,type,callback){
    var REGISTRATION=require("./_"+type+"Reg");
    REGISTRATION.create(fields,function(err,data){
        if(err) return callback(err);
        return callback(null,data);
    })
    
}

exports.findRegisteredPlayers=function(callback){
    this.find({__t:"player-registration"},"firstname __t fullname lastname hockey_info")
    .exec((err)=>{if(err) throw "Error finding player registrations";})
    .then(newPlayers=>{
        Player.find({status:"renewing membership"},"__t fullname lastname team").lean()
        .exec(function(err,oldPlayers){
            if(err) throw "Error retrieving returning players";
            var result=oldPlayers.concat(newPlayers)
                        .sort((a,b)=> {if(a.lastname>b.lastname) {return 1} return 0; })
            return callback(result);
        })
    }).catch(function(err){
        if(err) throw "Error within the findRegisteredPlayers function";
    })
}
