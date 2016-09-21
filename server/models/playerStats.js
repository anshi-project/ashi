var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var playerStatsSchema=new Schema({
    season:{type:Number,default:1},
    game:{type:Number,default:1},
    team:String,
    player:{type:Schema.Types.ObjectId,ref:"registration"},
    scores:{
        G:{type:Number,default:0},
        A:{type:Number,default:0},
        P:{type:Number,default:0},
        PIM:{type:Number,default:0},
        SOG:{type:Number,default:0},
        GWG:{type:Number,default:0},
        PP:{type:Number,default:0},
        SH:{type:Number,default:0},    
    }
})

module.exports=mongoose.model("playerStats",playerStatsSchema)