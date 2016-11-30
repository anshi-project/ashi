var common = require("./common")
var teams = require("./teams").names;

module.exports = [
    common.firstname,
    common.lastname,
    common.email,
    {
    	label:"Team you're trying out for",
		name:"hockey_info[team]",
		dropdown:teams
	},
	{
		label:"Select one or more position",
		name:"hockey_info[position]",
		checkbox:["Left wing", "Right wing", "Center", "Right defense", "Left defense", "Goalie"]
	}
]