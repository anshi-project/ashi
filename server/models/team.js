var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var teamStatsSchema = new Schema({
  team_name:{type:String},    
  season:{type: String, default: "2015-16"},
  GP:{type:Number,default:0},
  W:{type:Number,default:0},
  L:{type:Number,default:0},
  T:{type:Number,default:0},
  OT:{type:Number,default:0},
  OSO:{type:Number,default:0},
  P:{type:Number,default:0},
  GF:{type:Number,default:0},
  GA:{type:Number,default:0},
  PP_percent:{type:Number,default:0},
  PK_percent:{type:Number,default:0}
})


var teamSchema=new Schema({
    name:String,
    address:{
        city:String,
        state:String,
        street:String
    },
    website:String,
    players:[{type:Schema.Types.ObjectId,ref:"registration"}],
    goalies:[{type:Schema.Types.ObjectId,ref:"registration"}],
    previous_seasons: [teamStatsSchema],
    current_season:[teamStatsSchema]

})

module.exports=mongoose.model("team",teamSchema)




