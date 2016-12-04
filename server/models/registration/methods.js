var Team=require("../team/team");
var Player=require("../players/main")

var _=require("lodash");


function formatPerson(doc,team,type){
    var getDivision = require("../../locals/fields/teams").getDivision;
    var omitArray = ["_id","__t","__v","createdAt","updatedAt","status"];
    var person =_.omit(doc , omitArray)    
    team.division = getDivision(team.name)
    

    if(type == "player"){
        var info = doc.hockey_info;
        var jersey_number = info.jersey_number.choice1;
        var shooting_hand = info.shooting_hand;
        var position = info.position;
        var flag = position.indexOf("Goalie") == -1;//Player is not a goalie
        
        person.discriminator = flag? "_default":"_goalie"; 
        person.model = "../players/" + person.discriminator;
        person.type = flag? "players" : "goalies";

        team = Object.assign({}, team, {jersey_number,shooting_hand,position})
        //extra formatting for team field within Player model...
        //move the relevant hockey_info data into the 'team' field for more convenient API 
    }else{
        person.type = "coaches";
        person.model = "../staff/coach";
        //type === coach
    }

    person.team = team;
    return person;
}

exports.assignToTeam = function(id, team, type, callback){   
    var Registration = require(`./_${type}Reg`); 
    
    Registration.findById(id).exec((err,doc) => {
        if(err) return callback(err);

        var userData = formatPerson(doc.toObject(), team, type);
        
        var User = require(userData.model)
        

        User.create(userData)
         .then((newUser) => { Team.addToRoster({name:team.name}, newUser._id, userData.type) })
         .then(() => { doc.remove() })
         .then(() => {return callback(null, player)})
         .catch( err=>{if(err) return callback(err) })
    })    
}


exports.findRegisteredPlayers=function(callback){
    this.find({__t:"player-registration"},"firstname __t fullname lastname hockey_info")
    .exec((err)=>{if(err) throw "Error finding player registrations";})
    .then(newPlayers=>{
        Player.find({status:"renewing membership"},"__t fullname firstname lastname team")
        .exec(function(err,oldPlayers){
            
            var result=oldPlayers.concat(newPlayers)
                        .sort((a,b)=> {if(a.lastname>b.lastname) {return 1} return 0; })
            return callback(result);
        })
    }).catch(function(err){
        if(err) throw "Error within the findRegisteredPlayers function";
    })
}
