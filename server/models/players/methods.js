var Team=require("../team/team")

exports.assign=function(id,team,callback){
	var type=team.position=="Goalie"? "goalies":"players";
	var person;
	this.findById(id,function(err,doc){
		person=doc.fullname;
		doc.team.name=team.name;
		doc.team.position=team.position;
		doc.status="Active";
		doc.save();
	}).then(()=> {Team.addToRoster({name:team.name},id,type)})
	  .then(()=> {return callback(null,person)})
	  .catch((err)=>{if(err) return callback(err) })
}


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