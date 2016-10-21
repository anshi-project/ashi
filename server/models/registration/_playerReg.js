var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Registration=require("./main");

var PlayerReg=Registration.discriminator("player-registration",
  new Schema({
    public_data:{  
      date_of_birth:{type:String},
      gender:String,
      weight:Number,
      height:String
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
    background:{
      education:String,
      hometown:String,
      hockey_history:String,
      other_sports:String,
      career_highlights:String,
    },
    favorite:{
      movie:String,
      tvshow:String,
      athlete:String,
      sports_team:String,
      other_sport:String,
      food_or_restaurant:String
    },         
    hockey_info:{
      team:String,
      position:String,
      shooting_hand:String,
      tournament_team:{type:String,default:"N/A"},
      leaugue_team:{type:String,default:"N/A"},
      website:{type:String,default:"N/A"},
      jersey_number:{
        choice1:Number,
        choice2:Number,
        choice3:Number  
      }
    }
  })
)

module.exports=PlayerReg;
