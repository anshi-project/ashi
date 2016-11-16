var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Registration = require("./main");

var PlayerReg = Registration.discriminator("player-registration",
  new Schema({
    public_data:{  
      date_of_birth:{type:String},
      gender:String,
      weight:Number,
      height:String,
    },
    contact:{
      phone1:String,
      phone2:{type:String,set:Default},
      email:{type:String,lowercase:true},
      alt_email:String,
      passport:String,
      passport_expiration:{type:String,set:Default},
      private_data:{
        guardian_name:{type:String},
        guardian_number:{type:String},
        address:{
          street:String,
          state:String,
          city:String,
          zipcode:String
        }
      }
    },
    background:{
      social_media:{},
      hometown:String,
      education:String,
      hockey_history:String,
      other_sports:String,
      career_highlights:String,
    },
    favorite:{
      movie:String,
      tv_show:String,
      athlete:String,
      sports_team:String,
      other_sport:String,
      food_or_restaurant:String
    },         
    hockey_info:{
      team:String,
      position:String,
      shooting_hand:String,
      tournament_team:String,
      league_team:String,
      website:String,
      jersey_number:{
        choice1:Number,
        choice2:Number,
        choice3:Number  
      }
    }
  })
)

function Default(val){
  return val||"N|A"
}
module.exports=PlayerReg;
