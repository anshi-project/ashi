var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Registration=require("./main");

var CoachReg=Registration.discriminator("coach-registration",
    new Schema({
        background:{
            former_coaching_positions:[{type:String}],
            hometown:String,         
            short_answers:{
                career_highlights:String,
                preparation:String,
                coaching_style:String,
                why_a_good_candidate:String,
                create_team_atmosphere:String,
            },
            preferred_coaching_position:{type:String},
            team_applying_for:String,
            highest_level_coached:String
        }    
    })
)


module.exports=CoachReg;