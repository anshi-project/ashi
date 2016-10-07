var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Registration=require("./main");

var PlayerReg=Registration.discriminator("PlayerRegistration",
    new Schema({
      public_data:{  
        lastname:{type:String,lowercase:true},
        firstname:{type:String,lowercase:true},
        date_of_birth:{type:String},
        email:{type:String,lowercase:true},
        gender:String,
        weight:Number,
        height:String, 
      },
 
      bio:{
        education:String,
        hometown:String,
        hockey_history:String,
        other_sports:String,
        career_highlights:String,
      },
      lifestyle:{
        movie:String,
        tvshow:String,
        athlete:String,
        sports_team:String,
        other_sport:String,
        food:String
      },  
      
      hockey_info:{
        team:String,
        position:String,
        shooting_hand:String,
        tournament_team:{type:String,default:"N/A"},
        leaugue_team:{type:String,default:"N/A"},
        website:{type:String,default:"N/A"}
      },
      
      jersey_number_choices:[{type:Number}]
    })

)



module.exports=PlayerReg;
