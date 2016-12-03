var Team = require("../../models/team/team");
var Players = require("../../models/players/main");
var writeFile = require("../../locals/rosterDownload");
var fs = require("fs");

var _ = require("lodash")

module.exports = function(app) {
	app.get("/gm/index", function(req, res) {
		var path = "managers coaches players goalies";
		var fields = "division key name "+path;
		var select = "-contact.private_data -favorite -background -career_stats -game_stats -season_stats";
		var match =  {status: {$in:["Active","archive"]}};

		Team.find({division: {$in: req.user.division}}, fields)
			.populate({path, match, select})
			.exec(function(err, teams) {
				if(err) throw err;
				res.render("manager/roster", {teams,layout:"user",userType:"manager"});
			})
	})

	app.put("/manager/roster",function(req,res){
		Players.updatePayments(req.body, function(err,data){
			if(err) return res.send("Something went wrong").status(500);
			res.send(data).status(200);
		})
	})

	app.get("/manager/roster/export", function(req, res) {

		Players.find({"team.division": {$in:req.user.division}})
			.sort({lastname: 1})
			.lean()
			.exec(function(err, players) {
				writeFile(players, function(err, file) {
					if (err) throw err;
					res.download(file, req.user.division + ".xlsx", function(err) {
						if (err) throw err;
					});
				})
			})
	})

	app.put("/:type/roster/archive",function(req,res){
	 	var Team = require("../models/team/team")
	 	var teamName = req.body.team;
	 	var restore = req.body.restore;

	 	if (!restore) {
	 		Team.archive(teamName, function(err,players){
	 			if(err) return res.send(err);
	 			res.send(players)
	 		})
	 	}
	 	else{
	 		Team.restore(teamName, function(err,players){
	 			if(err) return res.send(err);
	 			res.send(players)	 			
	 		})
	 	}
	})
}