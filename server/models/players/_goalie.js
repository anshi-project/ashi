var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Player=require("./main");

var GoalieSeasonStatsSchema = new Schema({
            season:{type:Number, required: true},
            team_name:{type:String, required: true},
            games_played:{type:Number,default:0, required: true},
            MIN:{type:Number,default:0, required: true},
            SA:{type:Number,default:0, required: true},
            SV:{type:Number,default:0, required: true},
            GA:{type:Number,default:0, required: true},
            SO:{type:Number,default:0, required: true},
            G:{type:Number,default:0, required: true},
            A:{type:Number,default:0, required: true},
            P:{type:Number,default:0, required: true},
            PIM:{type:Number,default:0, required: true},
            SOSh:{type:Number,default:0, required: true},
            SOSa:{type:Number,default:0, required: true},
            win:{type:Number,default:0, required: true},
            loss:{type:Number,default:0, required: true},
            tie:{type:Number,default:0, required: true}
});

var GoalieGameStatsSchema = new Schema({
            season:{type:Number, required: true},
            team_name:{type:String, required: true},
            date:{type:String, required: true},
            home_game:{type:Boolean, required: true},
            opponent:{type:String, required: true},
            result:{type:String, required: true},
            MIN:{type:Number,default:0, required: true},
            SA:{type:Number,default:0, required: true},
            SV:{type:Number,default:0, required: true},
            GA:{type:Number,default:0, required: true},
            SO:{type:Number,default:0, required: true},
            G:{type:Number,default:0, required: true},
            A:{type:Number,default:0, required: true},
            P:{type:Number,default:0, required: true},
            PIM:{type:Number,default:0, required: true},
            SOSh:{type:Number,default:0, required: true},
            SOSa:{type:Number,default:0, required: true},
            GAA:{type:Number, default:0, required: true},
            SVP:{type:Number, default:0, required: true}
});

var GoalieStatsSchema = new Schema({
    season_stats : [GoalieSeasonStatsSchema],
    game_stats : [GoalieGameStatsSchema],
    career_stats : {games_played:{type:Number,default:0, required: true},
                    MIN:{type:Number,default:0, required: true},
                    SA:{type:Number,default:0, required: true},
                    SV:{type:Number,default:0, required: true},
                    GA:{type:Number,default:0, required: true},
                    SO:{type:Number,default:0, required: true},
                    G:{type:Number,default:0, required: true},
                    A:{type:Number,default:0, required: true},
                    P:{type:Number,default:0, required: true},
                    PIM:{type:Number,default:0, required: true},
                    SOSh:{type:Number,default:0, required: true},
                    SOSa:{type:Number,default:0, required: true},
                    win:{type:Number,default:0, required: true},
                    loss:{type:Number,default:0, required: true},
                    tie:{type:Number,default:0, required: true}}
});

var goalie=Player.discriminator("Goalie", GoalieStatsSchema);

module.exports=goalie;
