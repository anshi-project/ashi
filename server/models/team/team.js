var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("lodash");
var Players = require("../players/main")

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
    archive:{
        timestamp:Date,
        isArchived:Boolean       
    }, 
    managers: [{type: Schema.Types.ObjectId, ref: "Manager"}],
    coaches: [{type: Schema.Types.ObjectId, ref: "Coach"}],
    players: [{type: Schema.Types.ObjectId, ref: "Player"}],
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


teamSchema.statics.addToRoster = function(query, id, type){
    var update = {};
    update[type] = id;//ex.{players:id}

   this.update(query, {$push:update} ,{upsert:true,safe:true,multi:true}).exec()
    .then(() => {console.log("Updated player "+id)})  
    .catch((err) => {console.log(String(err))})
} 

teamSchema.statics.swap = function(currTeam,newTeam,id,type){
    var Team = this;
    var options = {upsert:true,safe:true,multi:true}
    var update = {};
    update[type] = id;
    
    Promise.all([
        Team.update({name:currTeam}, {"$pull": update }, options).exec(),
        Team.update({name:newTeam}, {"$push": update},   options).exec() 
        ])    
        .then(() => {console.log("User has Successfully swapped rosters")})
};

teamSchema.statics.swapDivisions = function(currDivisions,newDivisions,id){
    var Team = this;
    var options = {upsert:true,safe:true,multi:true}
    var update = {managers: id};

    
    Team.update({division: {$in:currDivisions}} , {$pull: update}, options).exec()
        .then(() =>{ 
            Team.update({division: {$in: newDivisions}}, {$push: update}, options).exec() 
        })
        .then(() => {return console.log("Successfully swapped manager's divisions")})
        .catch(err => {if(err) throw err; })
}

teamSchema.pre("save", next=>{
    var archive = this.archive;
    if(!archive || !archive.isArchived) return next();

    if(!archive.canRestore){
        this.archive.isArchived = false;
    }
    next();
})//update archived status before each save;


teamSchema.virtual("default_players").get(function(){
    var players = this.players
    if(!players.team) return;
    return players.filter(player => {return player.team.position.indexOf("Goalie") == -1} )
})

teamSchema.virtual("goalies").get(function(){
    var players = this.players;
    if(!players.team) return
    return players.filter(player => {return player.team.position.indexOf("Goalie") != -1 })
})

teamSchema.virtual("key").get(function(){
    var apostrophe = new RegExp("'","g");
    var str = this.name.replace(apostrophe,"");
    return str.toLowerCase().split(" ").join("-")
})

teamSchema.virtual("archive.canRestore").get(function(){
    var now = Date.now();
    
    if(!this.archive.timestamp) return false;

    var expiration = new Date(this.archive.timestamp);
    expiration.setDate(expiration.getDate()+7);

    if(Date.parse(expiration)> now && this.archive.isArchived){
        return true
    }
    return false;
})

teamSchema.virtual("archive.canUpdate").get(function(){
    var now = Date.now()
    var ts = new Date(this.archive.timestamp)
    ts.setMonth(ts.getMonth() + 7)

    if( now > Date.parse(ts) && !this.archive.isArchived){
        return false;
    }
    return true;
})//a flag for determining whether or not a new season can be set for a season;
 //check if the current date is more than 6 months past last update

teamSchema.statics.createNewSeason = function(name,next){
    var success = "A new season for this team has been created. You may restore the previous settings anytime within the next seven days";
    var timestamp = Date.now();
    var query = {"team.name":name,status:"Active"}
    var Players = require("../players/main")

    this.update({name}, {archive:{isArchived:true,timestamp}},{upsert:true})
        .then(()=>{ Players.update(query, {status:"archived", archivedAt:timestamp},{upsert:true,multi:true}).exec() })
        .then(() =>{return next(null, success);})
        .catch(err => { if(err) return next(String(err))})
}

teamSchema.statics.restore = function(name, next){
    var timestamp;
    var Team = this;
    var Players = require("../players/main")

    Team.findOne({name})
    .then((team)=>{
        timestamp = team.archive.timestamp;
        team.archive.isArchived = false ;
        team.save(err=>{if(err) throw new Error(String(err))})
    })
    .then(()=> {Players.update({archivedAt:timestamp},{status:"Active"},{multi:true,upsert:true}).exec()})        
    .then(() => {return next(null, "Successfully restored this team") })
    .catch(err => {if (err) return next(String(err))})
        
}


module.exports = mongoose.model("team",teamSchema)
