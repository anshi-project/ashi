var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var teamSchema = new Schema({
    name: String,
    division: String,
    address: {
        city: String,
        state: String,
        street: String
    },
    website: String,
    managers: [{type: Schema.Types.ObjectId, ref: "User"}],
    coach: [{type: Schema.Types.ObjectId, ref: "Coach"}],
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
    goalies: [{type: Schema.Types.ObjectId, ref: "Player"}],
    previous_seasons_stats: [{type: Schema.Types.ObjectId, ref: "TeamSeasonStats"}],
    current_season_stats: {type: Schema.Types.ObjectId, ref: "TeamSeasonStats"},
    games_stats: [{type: Schema.Types.ObjectId, ref: "GameStats"}]
})

// var teamStatsSchema = new Schema({
//   season:{type: String, default: "2015-16"},
//   game:String,
//   GP:{type:Number,default:0},
//   W:{type:Number,default:0},
//   L:{type:Number,default:0},
//   T:{type:Number,default:0},
//   OT:{type:Number,default:0},
//   OSO:{type:Number,default:0},
//   P:{type:Number,default:0},
//   GF:{type:Number,default:0},
//   GA:{type:Number,default:0},
//   PP_percent:{type:Number,default:0},
//   PK_percent:{type:Number,default:0},
//   final_score:String,
//   points_awarded:Number
// })


// var teamSchema=new Schema({
//     name:String,
//     division:String,
//     address:{
//         city:String,
//         state:String,
//         street:String
//     },
//     website:String,
//     managers:[{type:Schema.Types.ObjectId,ref:"User"}],
//     coach:[{type:Schema.Types.ObjectId,ref:"Coach"}],
//     players:[{type:Schema.Types.ObjectId,ref:"Player"}],
//     goalies:[{type:Schema.Types.ObjectId,ref:"Player"}],
//     previous_seasons: [],
//     current_season:[teamStatsSchema]

// })

teamSchema.statics.addToRoster = function(teamName,division,id,type){
    var query = {name:teamName,division:division};
    var update = {};
      update[type] = id;//ex.{players:id}
    
   this.findOneAndUpdate(query,{"$push":update},{upsert:true,safe:true},
         function(err,data){
             if(err) throw err;
        })
}

module.exports = mongoose.model("team",teamSchema)




