var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSeasonStatsSchema = new Schema({
            season:{type:Number},
            FS:{type:Number,default:0},
            GA: {type:Number,default:0},
            OT:{type:Number,default:0},
            PA:{type:Number,default:0},
            SO:{type:Number,default:0},
            win:{type:Number,default:0},
            loss:{type:Number,default:0}
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
    key:String,
    managers: [{type: Schema.Types.ObjectId, ref: "Manager"}],
    coach: [{type: Schema.Types.ObjectId, ref: "coach"}],
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
    goalies: [{type: Schema.Types.ObjectId, ref: "Player"}],
    game_stats: [TeamGameStatsSchema],
    season_stats: [TeamSeasonStatsSchema],
    alltime_stats: {FS:{type:Number},
                    GA: {type:Number},
                    OT:{type:Number},
                    PA:{type:Number},
                    SO:{type:Number},
                    win:{type:Number},
                    loss:{type:Number}
                    }               
});


teamSchema.statics.addToRoster = function(query,id,type){
    var update = {};
      update[type] = id;//ex.{players:id}
    
   this.update(query,{"$push":update},{upsert:true,safe:true,multi:true},
         function(err,data){
             if(err) throw err;
        })
    
}

module.exports = mongoose.model("team",teamSchema)




