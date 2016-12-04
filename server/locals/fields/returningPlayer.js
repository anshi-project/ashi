var common = require("./common")
var enums = require("./enums");

module.exports = [
    common.firstname,
    common.lastname,
    common.email,
    {
    	label:"Team you're trying out for",
		name:"hockey_info[team]",
		dropdown:enums.teams.applyingFor
	},
	{
		label:"Select one or more position",
		name:"hockey_info[position]",
		checkbox: enums.positions
	}
]