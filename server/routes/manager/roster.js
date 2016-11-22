var Team = require("../../models/team/team");
var Players = require("../../models/players/main");
var writeFile = require("../../locals/rosterDownload");
var fs = require("fs");

var _ = require("lodash")

module.exports = function(app) {
	app.get("/gm/roster", function(req, res) {
		var path = "managers coaches players goalies";
		var fields = "division key name "+path;
		var select = "-contact.private_data -favorite -background -career_stats -game_stats -season_stats";
		var match =  {status: "Active"};

		Team.find({division: {$in: req.user.division}}, fields)
			.populate({path, match, select})
			.exec(function(err, teams) {
				if(err) throw err;
				res.render("manager/roster", {teams,layout:"user",userType:"manager"});
			})
	})

 	app.post("/message",function(req,res){
    	var sendMessage = require("../../config/nodemailer");
    	
    	sendMessage(req.body);
    	
    	res.send(req.body);    
    })

	app.get("/gm/roster/export", function(req, res) {

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
}