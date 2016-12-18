var Team = require("../../models/team/team");
var Players = require("../../models/players/main");
var writeFile = require("../../locals/rosterDownload");
var fs = require("fs");

var teamsInDivision = require("../../locals/fields/teams").getTeamsInDivision;

var _ = require("lodash")

module.exports = function(app) {
	app.get("/gm/index", function(req, res, next) {
		var path = "managers coaches players";
		var fields = "division key name "+path;
		var select = "-contact.private_data -favorite -background -career_stats -game_stats -season_stats";
	
		Team.find({division: {$in: req.user.division}}, fields)
			.populate({path, match:{status:"Active"}, options:{sort:{"team.jersey_number":-1}}, select})
			.exec(function(err, teams) {
				if(err) return next({status:404})
	
				res.render("manager/roster", {teams,layout:"user",userType:"manager"});
			})
	})

	app.put("/manager/roster",function(req,res){
		Players.updatePayments(req.body, function(err,data){
			if(err) return res.send("Something went wrong").status(500);
			res.send(data).status(200);
		})
	})

	app.get("/manager/roster/:key/export", function(req, res, next) {
	    var key = req.params.key;
	    var val = req.query.q
	    var filename = val? val+".xlsx" : "ASHI-Players.xlsx"
	    var query = {status:"Active"};
	    var teamsInDivion = require("../../locals/fields/teams").getTeamsInDivision;
	    var teams;

	    if(key == "name"){
	      query["team.name"] = val;
	    }else if(key == "division"){
	      query["team.name"] = {$in: teamsInDivion(val)}
	    }else{
	    	teams = [];
	    	req.user.division.forEach(division =>{
	    		teams = teams.concat(teamsInDivion(division))
	    	})
	    	query["team.name"] = {$in: teams}
	    } 

		Players.find(query)
			.sort({lastname: 1})
			.exec(function(err, players) {
				if(err) return next({status:503})
				writeFile(players, function(err, file) {
					if (err) res.send(String(err))
					res.download(file, filename, (err)=> {res.send(String(err))});
				})
			})
	})
}