var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var methods=require("./methods");


var playerSchema=new Schema({
    firstname:String,
    lastname:String,
    team:{
      name:String,
      division:String,
      position:String,
      jersey_number:String,
      shooting_hand:String
    },
    public_data:{
      date_of_birth:String,
      gender:String,
      weight:String,
      height:String,
      hometown:String
    },
    background:{
      education:String,
      hockey_history:String,
      other_sports:String,
      career_highlights:String
    },
    favorite:{
      movie:String,
      tvshow:String,
      athlete:String,
      sports_team:String,
      other_sport:String,
      food_or_restaurant:String
    },
    contact:{
      phone1:String,
      phone2:{type:String,default:"N/A"},
      email:{type:String,lowercase:true},
      alt_email:String,
      passport:String,
      passport_expiration:{type:String,default:"N/A"},
      social_media:{},
      private_data:{
        guardian_name:{type:String,default:"N/A"},
        guardian_number:{type:String,default:"N/A"},
        address:{
          street:String,
          state:String,
          city:String,
          zipcode:String
        }
      }
    },
    apparel:{

    },

    hockey_info:{
      website:String,
      leaugue_team: String,
      tournament_team: String
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
  if(pos[1]=="Defense") return "D";

  return pos.map(v=> v.charAt(0)).join("")

})

playerSchema.statics.assign=methods.assign;
//Create a new player object from the registration object. Assign to a team.
playerSchema.statics.reassign=methods.reassign
//Assign a player that already exists within the database to a new team;



module.exports=mongoose.model("Player",playerSchema)
