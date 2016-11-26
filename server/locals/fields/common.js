var teamData = require("./teams.js");
var sizes = ["SM", "M", "L", "XL", "XXL", "XXXL"];
var months = [{num: 1, text: 'January'}, {num: 2, text: 'February'}, {num: 3, text: 'March'},
              {num: 4, text: 'April'}, {num: 5, text: 'May'}, {num: 6, text: 'June'},
              {num: 7, text: 'July'}, {num: 8, text: 'August'}, {num: 9, text: 'September'},
              {num: 10, text: 'October'}, {num: 11, text: 'November'},
              {num: 12, text: 'December'}];

module.exports = {
	firstname: {
		label: "First name",
		name: "firstname",
		class: 'fullwidth',
		type: 'text'
	},
	lastname: {
		label: "Last name",
		name: "lastname",
		class: 'fullwidth',
		type: 'text'
	},
	email: {
		label: "Email",
		name: "contact[email]",
		class: 'fullwidth email',
	},
	alt_email: {
		label: "Secondary email",
		name: "contact[alt_email]",
		type: "email",
		class: 'fullwidth optional',
		required: false,
	},
	phone1: {
		label: "Primary phone number",
		name: "contact[phone1]",
	},
	phone2: {
		label: "Secondary phone number",
		name: "contact[phone2]",
    class: 'optional',
		required: false,
	},
	passport: {
		label: "Do you have a passport?",
		label2:"Passport",
		name: "contact[passport]",
		radio: ["Yes", "No"],
	},
	passport_exp: {
		label: "Passport expiration date",
		name: "contact[passport_exp]",
		date: 'date',
		month: months,
		day_input: 'passport-day',
		year_input: 'passport-year',
		class: 'passport',
    hidden: 'contact[passport_expiration]',
	},
	facebook: {
		label: "Facebook",
		name: "background[social_media][facebook]",
		class: 'fullwidth optional',
		required: false,
	},
	instagram: {
		label: "Instagram",
		name: "background[social_media][instagram]",
		class: 'fullwidth optional',
		required: false,
	},
	twitter: {
		label: "Twitter",
		name: "background[social_media][twitter]",
		class: 'fullwidth optional',
		required: false
	},
	linkedin: {
		label: "LinkedIn",
		name: "background[social_media][linkedin]",
		class: 'fullwidth optional',
		required: false
	},
	shirt: {
		label: "Shirt size (Unisex)",
		name: "apparel[shirt]",
		radio: sizes
	},
	jacket: {
		label: "Jacket size (Unisex)",
		name: "apparel[jacket]",
		radio: sizes
	},
	hat: {
		label: "Hat size (Unisex)",
		name: "apparel[hat]",
		radio: ["S/M", "L/XL"]
	},
	polo: {
		label: "Polo size (Unisex)",
		name: "apparel[polo]",
		radio: sizes
	},
	shorts: {
		label: "Shorts size (Unisex)",
		name: "apparel[shorts]",
		radio: sizes
	},
	jersey: {
		label: "Jersey size (Unisex)",
		name: "apparel[jersey]",
		radio: sizes.concat(["Goalie-XXL", "Goalie-XXXL"]),
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
		name:"background[hometown]",
		class: 'fullwidth',
	},
	username:{
		label:"Username",
		name:"username",
	},
	password:{
		label:"Password (at least 8 characters, including 1 uppercase letter and 1 digit)",
		name:"password",
		type:"password",
		registration_only:true,
	},
	confirmPW:{
		label:"Confirm password",
		name:"",
		type:"password",
		registration_only:true,
    class: 'password',
	},
	confirmPW:{
		label:"Confirm password",
		name:"confirm_password",
		type:"password",
    registration_only:true,
    class: 'confirm-password',
	}
}
