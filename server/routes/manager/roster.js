var Team = require("../../models/team/team");
var Players = require("../../models/players/main");
var writeFile = require("../../locals/rosterDownload");
var fs = require("fs");

var _ = require("lodash")

module.exports = function(app) {
	app.get("/gm/roster", function(req, res) {
		var fields = "-contact.private_data -favorite -career_stats -game_stats -season_stats"
		Team.find({
				division: req.user.division
			}, "division key name players goalies coaches")
			.populate({
				path: "coaches players goalies",
				match: {status: "Active"},
				select: fields
			})
			.exec(function(e, d) {
				res.render("manager/roster", {teams: d});
			})
	})

	app.get("/gm/roster/export", function(req, res) {
		
		Players.find({"team.division": req.user.division})
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
}