var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Player=require("./main");

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
            win:{type:Number},
            loss:{type:Number}
});

var PlayerGameStatsSchema = new Schema({
            season:{type:Number},
            team_name:{type:String},
            date:{type:String},
            home_game:{type:Boolean},
            opponent:{type:String},
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
    season_stats : [PlayerSeasonStatsSchema],
    game_stats : [PlayerGameStatsSchema],
    career_stats : {G:{type:Number,default:0},
                    A:{type:Number,default:0},
                    P:{type:Number,default:0},
                    PM:{type:Number,default:0},
                    PIM:{type:Number,default:0},
                    SOG:{type:Number,default:0},
                    GWG:{type:Number,default:0},
                    PP:{type:Number,default:0},
                    SH:{type:Number,default:0},
                    win:{type:Number,default:0},
                    loss:{type:Number,default:0}}
});

var player=Player.discriminator("Default", PlayerStatsSchema);
       

module.exports=player;