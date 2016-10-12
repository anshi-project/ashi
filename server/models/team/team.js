var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamAllTimeStatsSchema = new Schema({
            FS:{type:Number,default:0},
            GA: {type:Number,default:0},
            OT:{type:Number,default:0},
            PA:{type:Number,default:0},
            SO:{type:Number,default:0},
            win:{type:Number},
            loss:{type:Number}
});

var TeamSeasonStatsSchema = new Schema({
            season:{type:Number},
            FS:{type:Number,default:0},
            GA: {type:Number,default:0},
            OT:{type:Number,default:0},
            PA:{type:Number,default:0},
            SO:{type:Number,default:0},
            win:{type:Number},
            loss:{type:Number}
});

var TeamGameStatsSchema = new Schema({
            season:{type:Number},
            date:{type:String},
            home_game:{type:Boolean},
            opponent:{type:String},
            win:{type:Boolean},
            FS:{type:Number,default:0},
            GA: {type:Number,default:0},
            Q1:{type:Number,default:0},
            Q2:{type:Number,default:0},
            Q3:{type:Number,default:0},
            OT:{type:Number,default:0},
            PA:{type:Number,default:0},
            SO:{type:Number,default:0}
});


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
    game_stats: [TeamGameStatsSchema],
    seasons_stats: [TeamSeasonStatsSchema],
    alltime_stats: [TeamAllTimeStatsSchema]
});


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




