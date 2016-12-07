var enums = require("./enums.js");


module.exports = {
	firstname: {
		label: "First name",
		name: "firstname",
		class: 'fullwidth'
	},
	lastname: {
		label: "Last name",
		name: "lastname",
		class: 'fullwidth'
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
		month: enums.months,
		day_input: 'passport-day',
		year_input: 'passport-year',
		class: 'passport',
    	hidden: 'contact[passport_expiration]',
    	registration_only:true
	},
	passport_expiration:{
		label:"Passport expiration date",
		name:"contact[passport_expiration]",
		recordOnly:true
	},
	facebook: {
		label: "Facebook",
		name: "background[social_media][facebook]",
		class: 'fullwidth optional',
		required: false
	},
	instagram: {
		label: "Instagram",
		name: "background[social_media][instagram]",
		class: 'fullwidth optional',
		required: false
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
		radio: enums.apparelSizes.default
	},
	jacket: {
		label: "Jacket size (Unisex)",
		name: "apparel[jacket]",
		radio: enums.apparelSizes.default
	},
	hat: {
		label: "Hat size (Unisex)",
		name: "apparel[hat]",
		radio: enums.apparelSizes.hat
	},
	polo: {
		label: "Polo size (Unisex)",
		name: "apparel[polo]",
		radio: enums.apparelSizes.default
	},
	shorts: {
		label: "Shorts size (Unisex)",
		name: "apparel[shorts]",
		radio: enums.apparelSizes.default
	},
	jersey: {
		label: "Jersey size (Unisex)",
		name: "apparel[jersey]",
		radio: enums.apparelSizes.jersey
	},
	socks: {
		label: "Sock Size",
		name: "apparel[socks]",
		radio: enums.apparelSizes.socks
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
    	class: 'password',
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
