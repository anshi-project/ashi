var common = require("./common")
var teams = require("./teams").names

var states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
    "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD",
    "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
    "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"
];

var heights = ["4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"",
    "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"",
    "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"",
    "6'9\"", "6'10\"", "6'11\"", "7'0\""
];

var months = [{num: 1, text: 'January'}, {num: 2, text: 'February'}, {num: 3, text: 'March'},
              {num: 4, text: 'April'}, {num: 5, text: 'May'}, {num: 6, text: 'June'},
              {num: 7, text: 'July'}, {num: 8, text: 'August'}, {num: 9, text: 'September'},
              {num: 10, text: 'October'}, {num: 11, text: 'November'},
              {num: 12, text: 'December'}];

var positions = ["Left wing", "Right wing", "Center", "Right defense", "Left defense", "Goalie"];


module.exports = [
    common.firstname,
    common.lastname,
    {
        label:"Team",
        name:"team[name]",
        dropdown:teams,
        recordOnly:true,

    },
    {
        label:"Paid?",
        name:"paid",
        dropdown:[true, false],
        recordOnly:true
    },
    {
        label:"Headshot?",
        name:"headshot",
        dropdown:[true,false],
        recordOnly:true,
    },
    {
        label:"Jersey Number",
        name:"team[jersey_number]",
        type:"number",
        recordOnly:true
    },
    {
        label:"Position",
        name:"team[position]",
        dropdown:positions,
        recordOnly:true,
    },
    {
        label:"Shooting hand",
        name:"team[shooting_hand]",
        recordOnly:true,
        dropdown:["Left","Right"]
    },
    {
        label: "Gender",
        name: "public_data[gender]",
        radio: ["Male", "Female"]
    },
    {
        label: "Weight",
        name: "public_data[weight]",
        class: 'weight',
        maxlength: '3',
    },
    {
        label: "Height",
        name: "public_data[height]",
        dropdown: heights,
        class: 'player-height'
    },
    {
        label: "Birthday",
        name: "public_data[dob]",
        date: 'date',
        month: months,
        day_input: 'birthday-day',
    	year_input: 'birthday-year',
        class: 'birthday',
        hidden: 'public_data[date_of_birth]',
        registration_only:true
    },
    {
        label:"Birthday",
        name:"public_data[date_of_birth]",
        type:"date",
        recordOnly:true
    },
    common.passport,
    common.passport_exp,
    common.passport_expiration,
    common.email,
    common.alt_email,
    common.phone1,
    common.phone2,

    {
        label: "Address",
        name: "contact[private_data][address][street]",
        class: 'fullwidth'
    },

    {
        label: "City",
        name: "contact[private_data][address][city]",
        class: 'fullwidth'
    },

    {
        label: "State",
        name: "contact[private_data][address][state]",
        dropdown: states,
        class: 'state'
    },

    {
        label: "Zipcode",
        name: "contact[private_data][address][zipcode]"
    },

    common.hometown,

    {
        label: "Emergency contact: full name",
        name: "contact[private_data][guardian_name]",
        class: 'fullwidth'
    },

    {
        label: "Emergency contact: phone number",
        name: "contact[private_data][guardian_number]"
    },
    {
        label: "Team you are trying out for",
        name: "hockey_info[team]",
        radio: ["U16", "U18", "U20", "Men's Master\'s", "Women\'s Master\'s", "Men\'s", "Women\'s"],
        registration_only:true
    },
    {
        label: "Position",
        name: "hockey_info[position]",
        checkbox: positions,
        registration_only:true
    },
    {
        label:"Shooting hand",
        name:"hockey_info[shooting_hand]",
        radio:["Left","Right"],
        registration_only:true
    },
    {
        label: "Tournament team",
        name: "hockey_info[tournament_team]",
        class: 'optional',
        required:false,
    },

    {
        label: "League team",
        name: "hockey_info[league_team]",
        class: 'optional',
        required:false,
    },

    {
        label: "League or team website",
        name: "hockey_info[website]",
        class: 'fullwidth optional',
        required:false,
    },
    common.shirt,
    common.polo,
    common.jacket,
    common.hat,
    common.socks,
    common.shorts,
    common.jersey,
    {
        label: "Jersey # (00 - 99) 1st choice",
        name: "hockey_info[jersey_number][choice1]",
        maxlength: '2',
        class: 'jersey-1',
        registration_only:true
    },

    {
        label: "Jersey # (00 - 99) 2nd choice",
        name: "hockey_info[jersey_number][choice2]",
        maxlength: '2',
        class: 'jersey-2',
        registration_only:true
    },

    {
        label: "Jersey # (00 - 99) 3rd choice",
        name: "hockey_info[jersey_number][choice3]",
        maxlength: '2',
        class: 'jersey-3',
        registration_only:true
    },
    {
        label: "Education",
        name: "background[education]",
        class: 'fullwidth',
    },
    {
        label: "Hockey history",
        name: "background[hockey_history]",
        textarea: true
    },
    {
        label: "Other sports played",
        name: "background[other_sports]",
        textarea: true,
    },
    {
        label: "Career highlights",
        name: "background[career_highlights]",
        textarea: true
    },
    {
       label: "Favorite movie",
       name: "favorite[movie]",
       class: 'fullwidth optional',
   },

   {
       label: "Favorite tv show",
       name: "favorite[tv_show]",
       class: 'fullwidth optional',
   },
   {
       label: "Favorite sports team",
       name: "favorite[sports_team]",
       class: 'fullwidth optional',
   },
   {
       label: "Favorite athlete",
       name: "favorite[athlete]",
       class: 'fullwidth optional',
   },

   {
       label: "Favorite sport (other than hockey)",
       name: "favorite[other_sport]",
       class: 'fullwidth optional',
   },

   {
       label: "Favorite food or restaurant",
       name: "favorite[food_or_restaurant]",
       class: 'fullwidth optional',
   },
   common.facebook,
   common.twitter,
   common.instagram,
   common.linkedin,
]
