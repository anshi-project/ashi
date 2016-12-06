var social_media = require("./social_media")

var validate = require('../helpers/validate');
var enums = require("../../locals/fields/enums");

var common = {

	social_media,
	hometown: {
		type: String,
		trim: true,
		maxlength: 50,
	},
	career_highlights: {
		type: String,
		trim: true,
		maxlength: 4000,
	}
}

var player = {
	education: {
		type: String,
		trim: true,
		maxlength: 50,
	},
	hockey_history: {
		type: String,
		trim: true,
		maxlength: 4000,
	},
	other_sports: {
		type: String,
		trim: true,
		maxlength: 4000,
	},
}

var coach = {
	former_coaching_positions: [{
		type: String,
		required: true,
		enum: enums.coach.former_coaching_positions,
	}],
	short_answers: {
		career_highlights: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 4000,
		},
		preparation: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 4000,
		},
		coaching_style: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 4000,
		},
		why_a_good_candidate: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 4000,
		},
		create_team_atmosphere: {
			type: String,
			trim: true,
			minlength: 1,
			maxlength: 4000,
		},
	},
	preferred_coaching_position: {
		type: String,
		required: true,
		enum: enums.coach.roles
	},
	team_applying_for: {
		type: String,
		required: true,
		enum: enums.teams.applyingFor,
	},
	highest_level_coached: {
		type: String,
		required: true,
		enum: enums.coach.highest_level_coached,
	}
}

module.exports = {
	player:Object.assign({}, common , player),
	coach:Object.assign({}, common, coach)
} 