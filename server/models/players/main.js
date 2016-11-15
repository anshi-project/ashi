var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var methods = require("./methods");

var playerSchema=new Schema({
    firstname:{type:String,lowercase:true,trim:true},
    lastname:{type:String,lowercase:true,trim:true},
    paid:{type:Boolean,default:false},
    headshot:{type:Boolean,default:false},
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
    },
    background:{
      hometown:String,
      education:String,
      hockey_history:String,
      other_sports:String,
      career_highlights:String
    },
    favorite:{
      movie:String,
      tv_show:String,
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
      tournament_team: String,
      jersey_number:{
        choice1:Number,
        choice2:Number,
        choice3:Number  
      }
    },
     status:{type:String,default:"Active"} //inactive, renewing membership, Active
},{timestamps:true})

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

playerSchema.plugin(require("../plugins/setFullName"));


playerSchema.statics.assignToTeam=methods.assign;
//Create a new player object from the registration object. Assign to a team.
playerSchema.statics.reassign=methods.reassign
//Assign a player that already exists within the database to a new team;



module.exports=mongoose.model("Player",playerSchema)
