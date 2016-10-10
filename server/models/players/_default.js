var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Player=require("./main");

var PlayerCareerStatsSchema = new Schema({
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            P:{type:Number,default:0},
            PM:{type:Number,default:0},
            PIM:{type:Number,default:0},
            SOG:{type:Number,default:0},
            GWG:{type:Number,default:0},
            PP:{type:Number,default:0},
            SH:{type:Number,default:0}
});

var PlayerSeasonStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            P:{type:Number,default:0},
            PM:{type:Number,default:0},
            PIM:{type:Number,default:0},
            SOG:{type:Number,default:0},
            GWG:{type:Number,default:0},
            PP:{type:Number,default:0},
            SH:{type:Number,default:0},
            win:{type:Boolean},
            loss:{type:Boolean}
});

var PlayerGameStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            date:{type:String},
            home_game:{type:Boolean},
            win:{type:Boolean},
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            P:{type:Number,default:0},
            PM:{type:Number,default:0},
            PIM:{type:Number,default:0},
            SOG:{type:Number,default:0},
            GWG:{type:Number,default:0},
            PP:{type:Number,default:0},
            SH:{type:Number,default:0} 
});

var PlayerStatsSchema = new Schema({
    career_stats : [PlayerCareerStatsSchema],
    season_stats : [PlayerSeasonStatsSchema],
    game_stats : [PlayerGameStatsSchema]
});



var player=Player.discriminator("Default", PlayerStatsSchema);
       

module.exports=player;