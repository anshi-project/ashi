var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Player=require("./main");

var GoalieSeasonStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            MIN:{type:Number,default:0},
            SA:{type:Number,default:0},
            SV:{type:Number,default:0},
            GA:{type:Number,default:0},
            SO:{type:Number,default:0},
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            PIM:{type:Number,default:0},
            win:{type:Number},
            loss:{type:Number}
});

var GoalieGameStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            date:{type:String},
            home_game:{type:Boolean},
            opponent:{type:String},
            win:{type:Boolean},
            MIN:{type:Number,default:0},
            SA:{type:Number,default:0},
            SV:{type:Number,default:0},
            GA:{type:Number,default:0},
            SO:{type:Number,default:0},
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            PIM:{type:Number,default:0}
});

var GoalieStatsSchema = new Schema({
    season_stats : [GoalieSeasonStatsSchema],
    game_stats : [GoalieGameStatsSchema],
    career_stats : {games_played:{type:Number,default:0},
                    MIN:{type:Number,default:0},
                    SA:{type:Number,default:0},
                    SV:{type:Number,default:0},
                    GA:{type:Number,default:0},
                    SO:{type:Number,default:0},
                    G:{type:Number,default:0},
                    A:{type:Number,default:0},
                    PIM:{type:Number,default:0},
                    win:{type:Number},
                    loss:{type:Number}}
});

var goalie=Player.discriminator("Goalie", GoalieStatsSchema);

module.exports=goalie;


