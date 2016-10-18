var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var methods=require("./methods");


var playerSchema=new Schema({
    firstname:String,
    lastname:String,
    games_played:{type:Number,default:0},
    team:{
       name:String,
       division:String,
       position:String,
       jersey_number:String,
       shooting_hand:String
     },
     public_data:{
        date_of_birth:String,
        email:String,
        height:String,
        weight:Number,
        phone1:String,
    },
     registration:{
        apparel:{},
        bio:{
          hometown:String
        },
        social_media:{},
        lifestyle:{},
        contact:{},
        hockey_info:{
          tournament_team:String,
          league_team:String,
          website:String
        }
     },
     status:{type:String,default:"active"} //retired, renewing membership, active
})

playerSchema.virtual("public_data.age").get(function(){
    var now=Date.now();
    var dob=new Date(this.public_data.date_of_birth).getTime();
    var ageDate=new Date(now-dob);
    return Math.abs(ageDate.getUTCFullYear()-1970)

})

playerSchema.virtual("team.pos_abrv").get(function(){
  var pos=this.team.position.split(" ");
  if(pos[1]=="Defense") pos.shift();

  return pos.map(v=> v.charAt(0)).join("")

})

playerSchema.statics.assign=methods.assign;
//Create a new player object from the registration object. Assign to a team.
playerSchema.statics.reassign=methods.reassign
//Assign a player that already exists within the database to a new team;



module.exports=mongoose.model("Player",playerSchema)

