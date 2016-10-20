var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Player=require("./main");

var GoalieSeasonStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            games_played:{type:Number,default:0},
            MIN:{type:Number,default:0},
            SA:{type:Number,default:0},
            SV:{type:Number,default:0},
            GA:{type:Number,default:0},
            SO:{type:Number,default:0},
            win:{type:Number,default:0},
            loss:{type:Number,default:0},
            tie:{type:Number,default:0}
});

var GoalieGameStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            date:{type:String},
            home_game:{type:Boolean},
            opponent:{type:String},
            result:{type:String},
            MIN:{type:Number,default:0},
            SA:{type:Number,default:0},
            SV:{type:Number,default:0},
            GA:{type:Number,default:0},
            SO:{type:Number,default:0},
            GAA:{type:Number, default:0},
            SVP:{type:Number, default:0}
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
                    win:{type:Number,default:0},
                    loss:{type:Number,default:0},
                    tie:{type:Number,default:0}}
});

var goalie=Player.discriminator("Goalie", GoalieStatsSchema);

module.exports=goalie;


