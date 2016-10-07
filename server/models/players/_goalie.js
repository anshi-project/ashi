var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var Player=require("./main");


var goalie=Player.discriminator("Goalie", new Schema({
        scores:{
            G:{type:Number,default:0},
            A:{type:Number,default:0},
            PIM:{type:Number,default:0},
            MIN:{type:Number,default:0},
            SA:{type:Number,default:0},
            SV:{type:Number,default:0},
            GA:{type:Number,default:0},
            SO:{type:Number,default:0}
        }        
    })
)

module.exports=goalie;
