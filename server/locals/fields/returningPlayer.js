var common = require("./common")
var enums = require("./enums");

module.exports = [
    common.firstname,
    common.lastname,
    common.email,
    {
    	label:"Team you're trying out for",
		name:"team",
		dropdown:enums.teams.applyingFor
	},
	{
		label:"Select one or more position",
		name:"position",
		checkbox: enums.player.positions
	}
]