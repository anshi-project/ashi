var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var goalieStatsSchema=new Schema({
    season:{type:Number,default:1},
    game:{type:Number,default:1},
    team:String,
    player:{type:Schema.Types.ObjectId,ref:"registration"},
    scores:{
        MIN:{type:Number,default:0},
        SA:{type:Number,default:0},
        SV:{type:Number,default:0},
        SA:{type:Number,default:0},
        SV_Percent:{type:Number,default:0},
        GAA:{type:Number,default:0},
        SO:{type:Number,default:0},
        G:{type:Number,default:0},
        A:{type:Number,default:0},
        PIM:{type:Number,default:0}
    }
})

module.exports=mongoose.model("goalieStats",goalieStatsSchema)