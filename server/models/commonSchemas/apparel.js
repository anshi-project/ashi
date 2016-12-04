var validate = require("../helpers/validate");
var enums = require("../../locals/fields/enums");

var staff = {
	shirt: {
		type: String,
		required: true,
		enum: validate.sizes,
	},
	polo: {
		type: String,
		required: true,
		enum: validate.sizes,
	},
	hat: {
		type: String,
		required: true,
		enum: validate.sizes,
	},
	jacket: {
		type: String,
		required: true,
		enum: validate.sizes,
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