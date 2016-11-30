var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("lodash");

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
    archive:{
        isArchived:Boolean, 
        timestamp:Date
    }, 
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

teamSchema.methods.updateAndSave = function(){
    var Players = require("../players/main");
    var team = this;
    if(team.archive.isArchived){
        team.archive.isArchived = false;
        team.markModified("archive");
        Players.find({"team.name": team.name, status:"archived"})
               .update({status:"inactive"},{upsert:true,safe:true,multi:true})
    }
    team.save();
}//set up roster for new season

teamSchema.statics.addToRoster = function(query,id,type){
    var update = {};
      update[type] = id;//ex.{players:id}

   this.update(query,{"$push":update},{upsert:true,safe:true,multi:true},
         function(err,data){
             if(err) throw err;
        })
}

teamSchema.statics.swap = function(currTeam,newTeam,id,type){
    var update = {};
    update[type] = id;
   
   this.update({name:currTeam},{"$pull":update},{upsert:true,safe:true,multi:true},
         function(err,data){
             if(err) throw err;
             console.log("Pulled "+id+" from "+currTeam);
    })    

    this.addToRoster({name:newTeam},id,type);
}

teamSchema.statics.archive = function(name,next){
    var Players = require("../players/main")
    var date = new Date();
    var year = date.getFullYear();
    var timestamp = Date.parse(date)
    this.findOne({name}).exec(function(err,doc){
        doc.archive = {isArchived:true,timestamp};
        doc.markModified("archive");
        doc.save()
    }).then(()=>{
        Players.find({"team.name":name,status:"Active"},function(err,docs){
            docs.forEach(player =>{
                player.status = "archived";
                player.archive = {
                    timestamp,
                    isArchived:true,
                    season:year,
                    paid: player.paid 
                }
                player.paid = false;
                player.markModified("archive")
                player.save();
            })
            return next(null,docs);
        }).catch(err => { if(err) return next(err)})
    })
}

teamSchema.statics.restore = function(name, next){
    var timestamp;
    var Players = require("../players/main")
    
    this.findOne({name}).exec(function(err,doc){
        timestamp = doc.archive.timestamp;
        doc.archive.isArchived = false ;
        doc.markModified("archive");
        doc.save()
    }).then(function(){
        Players.find({"team.name":name, "archive.timestamp":timestamp},function(err,docs){
            docs.forEach(player =>{
                player.status = "Active";
                player.paid = player.archive.paid;
                player.archive.isArchived = false;
                player.markModified("archive")
                player.save() 
            })
            return next(null,docs)
        })
        .catch(err => { if(err)return next(err) })
    })

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
