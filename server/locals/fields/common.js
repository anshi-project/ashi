var teamData = require("./teams.js");


var sizes = ["SM", "M", "L", "XL", "XXL", "XXXL"];

module.exports = {
	firstname: {
		label: "First Name",
		name: "firstname"
	},
	lastname: {
		label: "Last Name",
		name: "lastname"
	},
	email: {
		label: "Email",
		name: "contact[email]",
		type: "email"
	},
	alt_email: {
		label: "Secondary Email",
		name: "contact[alt_email]",
		type: "email",
		required: false,
	},
	phone1: {
		label: "Primary Phone Number",
		name: "contact[phone1]",
	},
	phone2: {
		label: "Secondary Phone Number",
		name: "contact[phone2]",
		required: false
	},
	passport: {
		label: "Do you have a passport?",
		label2:"Passport",
		name: "contact[passport]",
		radio: ["Yes", "No"],
	},
	passport_exp: {
		label: "Passport Expiration Date",
		name: "contact[passport_expiration]",
		type: "date"
	},
	facebook: {
		label: "Facebook",
		name: "background[social_media][facebook]",
		required: false
	},
	instagram: {
		label: "Instagram",
		name: "background[social_media][instagram]",
		required: false
	},
	twitter: {
		label: "Twitter",
		name: "background[social_media][twitter]",
		required: false
	},
	linkedin: {
		label: "Linkedin",
		name: "background[social_media][linkedin]",
		required: false
	},
	shirt: {
		label: "Shirt size",
		name: "apparel[shirt]",
		radio: sizes
	},
	jacket: {
		label: "Jacket size",
		name: "apparel[jacket]",
		radio: sizes
	},
	hat: {
		label: "Hat size",
		name: "apparel[hat]",
		radio: ["S/M", "L/XL"]
	},
	polo: {
		label: "Polo size",
		name: "apparel[polo]",
		radio: sizes
	},
	shorts: {
		label: "Shorts size",
		name: "apparel[shorts]",
		radio: sizes
	},
	jersey: {
		label: "Jersey size",
		name: "apparel[jersey]",
		radio: sizes.concat(["Goalie-XXL", "Goalie-XXXL"])
	},
	socks: {
		label: "Sock Size",
		name: "apparel[socks]",
		radio: ["M", "L", "XL"]
	},

	team: {
		label: "Team",
		name: "team[name]",
		class: "team-dropdown"
		
	},
	division:{
		label:"Divison",
		name : "division",
		class:"division-dropdown"
		
	},

	hometown:{
		label:"Hometown",
		name:"background[hometown]"
	},
	username:{
		label:"Username",
		name:"username"
	},
	password:{
		label:"Password",
		name:"password",
		type:"password"
	},
	confirmPW:{
		label:"Confirm Password",
		name:"",
		type:"password"
	}
}


