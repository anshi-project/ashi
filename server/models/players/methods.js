var Team=require("../team/team")
var _ = require("lodash");

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

exports.updateTeamRecords = function(id, update, next){
	var division = require("../../locals/fields/teams").getDivision;
	var teams = [update["prev-team"].name, update.team.name];

	this.findById(id, function(err,doc){
		var category = doc.team.position == "Goalie"? "goalies" : "players"
		doc.team.name = update.team.name;
		doc.team.division = division( update.team.name);
		doc.paid = update.paid;
		doc.headshot = update.headshot;
		doc.markModified("team.name")
		doc.save();

		if(teams[0]!= teams[1]){
			Team.find({}).exec(function(err,docs){
				if(err) return next(err);
				docs.forEach(team => {
					if(team.name != update.team.name){
						team[category] = team[category].filter(v=>{return v != id})
					}else{
						team[category].push(id)
					}
					team.markModified(category);
					team.save()
				})
			})
		}
		next(null,doc);

	})

}


