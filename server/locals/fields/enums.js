var teams = require("./teams")


var apparelSizes = {
	default: ["S", "M", "L", "XL", "XXL", "XXXL"],
		hat: ["S/M" , "L/XL"],
	  socks: ["M", "L", "XL"],
	 jersey: ["S", "M", "L", "XL", "XXL", "XXXL", "Goalie-XXL", "Goalie-XXXL"]
}

var months = [{num: 1, text: 'January'}, {num: 2, text: 'February'}, {num: 3, text: 'March'},
              {num: 4, text: 'April'}, {num: 5, text: 'May'}, {num: 6, text: 'June'},
              {num: 7, text: 'July'}, {num: 8, text: 'August'}, {num: 9, text: 'September'},
              {num: 10, text: 'October'}, {num: 11, text: 'November'},
              {num: 12, text: 'December'}];

var heights = ["4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"",
    "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"",
    "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"",
    "6'9\"", "6'10\"", "6'11\"", "7'0\"", "test"]

var states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
    "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD",
    "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
    "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];





var player = {
	positions:["Left Wing", "Right Wing", "Center", "Right Defense", "Left Defense", "Goalie"],
	shooting_hand:["Left", "Right"],
	gender:["Male","Female"]
}


var teams = {
	names: teams.names,
	divisions: teams.divisions,
	applyingFor: ["U16", "U18", "U20", "Men's Master\'s", "Women\'s Master\'s", "Men\'s", "Women\'s"]
}

var coach = {
	roles:["Head Coach", "Assistant Head Coach", "Assistant Coach for Forwards", "Assistant Coach for Defense", "Other"],
	former_coaching_positions:["Ice Hockey", "Ball Hockey", "Field Hockey", "Other"],
	highest_level_coached:["Youth Hockey", "Junior's", "College", "Semi-Professional", "Professional", "Travel Ball Hockey","Other"]
}

module.exports = {teams, player, coach, apparelSizes, states, heights, months}
