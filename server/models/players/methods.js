var Team=require("../team/team")


exports.assign=function(registration,team,type,callback){
   var fields=["firstname","lastname","public_data"];
   var fields2=["bio","apparel","social_media","contact","lifestyle","hockey_info"];
  
   var player={team:team, registration:{}};
   var NewPlayer=require(type);

   fields.forEach(v=> player[v]=registration[v]);
   fields2.forEach(x=> player.registration[x]=registration[x]);

   player.team.shooting_hand=registration.hockey_info.shooting_hand;
   
   NewPlayer.create(player,function(err,doc){
      if(err)throw err;
      doc.query={name:team.name,division:team.division}
      callback(doc);
    });
}//Create a new player object from the registration object. Assign to a team.

exports.reassign=function(id,team){
     this.findById(id,function(err,doc){
          if(err) throw err;
          var type=team.position=="Goalie"? "goalies":"players";
          var query={division:team.division,name:team.name};

          doc.team=Object.assign(doc.team,query,{position:team.position,jersey_number:team.jersey_number});
          doc.status="active";
          doc.save();
          Team.addToRoster(query,id,type);
     })
}//Assign a player that already exists within the database to a new team;