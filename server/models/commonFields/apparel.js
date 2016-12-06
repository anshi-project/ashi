var validate = require("../helpers/validate");
var enums = require("../../locals/fields/enums");

var staff = {
	shirt: {
		type: String,
		required: true,
		enum: enums.apparelSizes.default,
	},
	polo: {
		type: String,
		required: true,
		enum: enums.apparelSizes.default,
	},
	hat: {
		type: String,
		required: true,
		enum: enums.apparelSizes.hat,
	},
	jacket: {
		type: String,
		required: true,
		enum: enums.apparelSizes.default,
	},
}

var playerApparel = {
	socks: {
		type: String,
		required: true,
		enum: enums.apparelSizes.socks,
	},
	shorts: {
		type: String,
		required: true,
		enum: enums.apparelSizes.default,
	},
	jersey: {
		type: String,
		required: true,
		enum: enums.apparelSizes.jersey,
	},
}

var player = Object.assign({}, staff, playerApparel);

module.exports = {player, staff}