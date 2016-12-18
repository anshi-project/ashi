teamSchema.statics.addToRoster = function(query, id, type){
    var update = {};
    update[type] = id;//ex.{players:id}

   this.update(query, action ,{upsert:true,safe:true,multi:true})  

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


teamSchema.virtual("default_players").get(function(){
    var players = this.players

    return players.filter(player => {return player.team.position.indexOf("Goalie") == -1} )
})

teamSchema.virtual("goalies").get(function(){
    var players = this.players;
    return players.filter(player => {return player.team.position.indexOf("Goalie") != -1 })
})


teamSchema.virtual("archive.canRestore").get(function(){
    var now = Date.now();
    
    if(!this.archive.timestamp) return false;

    var expiration = new Date(this.archive.timestamp);
    expiration.setMonth(expiration.getMonth()+1);

    if(Date.parse(expiration)> now && this.archive.isArchived){
        return true
    }
    return false;
})

teamSchema.virtual("archive.canUpdate").get(function(){
    var now = Date.now()
    var ts = new Date(this.archive.timestamp)
    ts.setMonth(ts.getMonth() + 6)
    
    if( now > Date.parse(ts)){
        return true;
    }
    return false;
})//a flag for determining whether or not a new season can be set for a season;

teamSchema.statics.createNewSeason = function(name,next){
    var Players = require("../players/main")

    var timestamp = Date.now();
    
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