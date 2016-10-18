var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Registration=require("./main");

var CoachReg=Registration.discriminator("coach-registration",
    new Schema({
        coaching_info:{
            former_coaching_positions:[{type:String}],
            highest_level_coached:String,
            former_coaching_positions_description:String,
            preferred_coaching_positions:[{type:String}],
            team_applying_for:String  
        },
        short_answers:{
            career_highlights:String,
            preparation:String,
            coaching_style:String,
            why_a_good_candidate:String,
            create_team_atmosphere:String
        }
    })
)


module.exports=CoachReg;