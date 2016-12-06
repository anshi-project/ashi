var validate = require("../helpers/validate")
var enums = require("../../locals/fields/enums")

module.exports = {
	website: {
		type: String,
		trim: true,
		validate: validate.url
	},

	league_team: {
		type: String,
		trim: true,
		maxlength: 50,
	},

	tournament_team: {
		type: String,
		trim: true,
		maxlength: 50,
	},

	team:{
		type:String,
		enum:enums.teams.names
	},
	position:{
		type:String,
		required:true,
		enum: enums.player.position
	},
	shooting_hand:{
		type:String,
		required:true,
		enum: enums.player.shooting_hand
	},
	jersey_number: {
		choice1: {
			type: Number,
			required: true,
			// validate: validate.jerseyNo,
		},
		choice2: {
			type: Number,
			required: true,
			// validate: validate.jerseyNo,
		},
		choice3: {
			type: Number,
			required: true,
			// validate: validate.jerseyNo,
		}
	}
}