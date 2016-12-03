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

function addYear(yr){
    var d = new Date("jan 1 "+yr);
    return d.getFullYear()+1;
}



