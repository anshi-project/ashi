var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSeasonStatsSchema = new Schema({
            season:{type:Number},
            games_played:{type:Number,default:0},
            GF:{type:Number,default:0},
            GA: {type:Number,default:0},
            OT:{type:Number,default:0},
            OT2:{type:Number,default:0},
            OT3:{type:Number,default:0},
            win:{type:Number,default:0},
            loss:{type:Number,default:0},
            tie:{type:Number,default:0}
});

var TeamGameStatsSchema = new Schema({
            season:{type:Number},
            date:{type:String},
            home_game:{type:Boolean},
            opponent:{type:String},
            result:{type:String},
            GF:{type:Number,default:0},
            GA: {type:Number,default:0},
            P1:{type:Number,default:0},
            P2:{type:Number,default:0},
            P3:{type:Number,default:0},
            OT:{type:Number,default:0},
            OT2:{type:Number,default:0},
            OT3:{type:Number,default:0},
            PPG:{type:Number,default:0},
            PPO:{type:Number,default:0},
            PKP:{type:Number,default:0},
            PPP:{type:Number,default:0}
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
    managers: [{type: Schema.Types.ObjectId, ref: "manager"}],
    coaches: [{type: Schema.Types.ObjectId, ref: "coach"}],
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
    goalies: [{type: Schema.Types.ObjectId, ref: "Player"}],
    game_stats: [TeamGameStatsSchema],
    season_stats: [TeamSeasonStatsSchema],
    alltime_stats: {games_played:{type:Number,default:0},
                    GF:{type:Number,default:0},
                    GA: {type:Number,default:0},
                    OT:{type:Number,default:0},
                    OT2:{type:Number,default:0},
                    OT3:{type:Number,default:0},
                    win:{type:Number,default:0},
                    loss:{type:Number,default:0},
                    tie:{type:Number,default:0}}
});


teamSchema.statics.addToRoster = function(query,id,type){
    var update = {};
      update[type] = id;//ex.{players:id}

   this.update(query,{"$push":update},{upsert:true,safe:true,multi:true},
         function(err,data){
             if(err) throw err;
        })
}

teamSchema.statics.swap = function(currQuery,newQuery,id,type){
    var update = {};
    update[type] = id;

   this.update(currQuery,{"$pull":update},{upsert:true,safe:true,multi:true},
         function(err,data){
             if(err) throw err;
    })    

    this.addToRoster(newQuery,id,type);
}


teamSchema.virtual("roster").get(function(){
    var team=this.players.concat(this.goalies);

    return team.sort(function(a,b){
      if(+a.team.jersey_number>+b.team.jersey_number) return 1;
      if(+a.team.jersey_number<+b.team.jersey_number) return -1;
        return 0;
    })

})

module.exports = mongoose.model("team",teamSchema)
