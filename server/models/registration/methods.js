
var mongoose = require("mongoose")

var _=require("lodash");


function formatPerson(doc,team,type){

    var omitArray = ["_id","__t","__v","createdAt","updatedAt"];
    var person =_.omit(doc , omitArray)    
 
    if(type == "player"){
        var info = doc.hockey_info;
        var jersey_number = info.jersey_number.choice1;
        var shooting_hand = info.shooting_hand;
        var position = info.position;
        var league_team = info.league_team;
        var tournament_team = info.tournament_team;
        var website = info.website;
 
        var teamName = team.name;

        person.model = "Player"
        person.type = "players"

        team = Object.assign({},{name:teamName, jersey_number, shooting_hand, position, league_team, tournament_team, website})
        //extra formatting for team field within Player model...
        //move the relevant hockey_info data into the 'team' field for more convenient API 
    }else{
        person.type = "coaches";
        person.model = "Coach";
        //type === coach
    }

    person.team = team;
    return person;
}

exports.assignToTeam = function(id, team, type, callback){   
    var Registration =  mongoose.model(`${type}-registration`)
    var Team = mongoose.model("team")


    Registration.findById(id).exec((err,doc) => {
        if(err) return callback(err);

        var userData = formatPerson(doc.toObject(), team, type);
        

        var User = mongoose.model(userData.model)
     
        var user = new User(userData);

        user.save()
         .then((newUser) => {
            var update = {};
            
            update[userData.type] = newUser._id;
            
            Team.update({name: newUser.team.name}, {"$push": update} , {upsert:true, new:true}).exec() 
        })
         .then(() => { doc.remove() })
         .then(() => {return callback(null, "Successfully added user to team")})
         .catch( err=>{if(err) return callback(err) })
    })    
}

exports.findRegisteredPlayers = function(callback){

    var Player = mongoose.model("Player");
    
    this.find({__t:"player-registration"},"firstname fullname contact.email lastname hockey_info")
    .then(newPlayers=>{
        Player.find({status:"renewing membership"},"fullname firstname contact.email lastname hockey_info team")
        .exec(function(err,oldPlayers){
            if(err) throw err;
            var result=oldPlayers.concat(newPlayers)
            
            return callback(null, result);
        })
    }).catch((err) =>{
        if(err) return callback(err);
    })
}
