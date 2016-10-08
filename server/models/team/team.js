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




