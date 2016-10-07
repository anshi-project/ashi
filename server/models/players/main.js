var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var playerSchema=new Schema({
     games_played:{type:Number,default:0},
     team:{
       name:String,
       division:String,
       position:String,
       jersey_number:String
     },
     registration:{}//any neccessary details from the players registration
})

module.exports=mongoose.model("Player",playerSchema)

