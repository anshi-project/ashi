var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Player=require("./main");


var player=Player.discriminator("Default", new Schema({
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
)

module.exports=player;