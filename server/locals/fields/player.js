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

var positions = ["Left Wing", "Right Wing", "Center", "Right Defense", "Left Defense", "Goalie"];


module.exports = [
    common.firstname,
    common.lastname, 
    {
        label:"Team",
        name:"team[name]",
        dropdown:teams,
        recordOnly:true,
        fields2:true
    },
    {
        label:"Paid?",
        name:"paid",
        dropdown:[true, false],
        fields2:true,
        recordOnly:true
    },
    {
        label:"Headshot?",
        name:"headshot",
        dropdown:[true,false],
        recordOnly:true,
        fields2:true
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
        recordOnly:true        
    },    
    {
        label: "Gender",
        name: "public_data[gender]",
        radio: ["Male", "Female"]
    }, 
    {
        label: "Weight",
        name: "public_data[weight]",
        type: "number",
    },
    {
        label: "Height",
        name: "public_data[height]",
        dropdown: heights,
    },
    {
        label: "Date of Birth",
        name: "public_data[date_of_birth]",
        type: "date"
    },
    common.passport,
    common.passport_exp,
    common.email,
    common.alt_email,
    common.phone1,
    common.phone2,

    {
        label: "Street",
        name: "contact[private_data][address][street]"
    },

    {
        label: "City",
        name: "contact[private_data][address][city]"
    },

    {
        label: "State",
        name: "contact[private_data][address][state]",
        dropdown: states
    },

    {
        label: "Zipcode",
        name: "contact[private_data][address][zipcode]"
    },

    common.hometown,

    {
        label: "Emergency contact: full name",
        name: "contact[private_data][guardian_name]"
    },

    {
        label: "Emergency contact: phone number",
        name: "contact[private_data][guardian_number]"
    }, 
    {
        label: "Team Trying Out For",
        name: "hockey_info[team]",
        radio: ["U16", "U18", "U20", "Men's Master\'s", "Women\'s Master\'s", "Men\'s", "Women\'s"],
        registration_only:true
    }, 
    {
        label: "Position",
        name: "hockey_info[position]",
        radio: positions,
        registration_only:true
    }, 
    {
        label:"Shooting Hand",
        name:"hockey_info[shooting_hand]",
        radio:["Left","Right"],
        registration_only:true
    },
    {
        label: "Tournament Team",
        name: "hockey_info[tournament_team]",
        required:false
    },

    {
        label: "League Team",
        name: "hockey_info[league_team]",
        required:false
    },

    {
        label: "League or Team Website",
        name: "hockey_info[website]",
        required:false
    }, 
    common.shirt,
    common.polo,
    common.jacket,
    common.hat,
    common.socks,
    common.shorts,
    common.jersey,
    {
        label: "Jersey # 1st choice",
        name: "hockey_info[jersey_number][choice1]",
        type: "number",
        min: "0",
        max: "99",
        registration_only:true
    },

    {
        label: "Jersey # 2nd choice",
        name: "hockey_info[jersey_number][choice2]",
        type: "number",
        min: "0",
        max: "99",
        registration_only:true
    },

    {
        label: "Jersey # 3rd choice",
        name: "hockey_info[jersey_number][choice3]",
        type: "number",
        min: "0",
        max: "99",
        registration_only:true
    },

     {
        label: "Favorite Movie",
        name: "favorite[movie]"
    },

    {
        label: "Favorite TV show",
        name: "favorite[tv_show]"
    },
    {
        label: "Favorite sports team",
        name: "favorite[sports_team]"
    },
    {
        label: "Favorite Athlete",
        name: "favorite[athlete]"
    },

    {
        label: "Favorite sport (not hockey)",
        name: "favorite[other_sport]"
    },

    {
        label: "Favorite food or restaurant",
        name: "favorite[food_or_restaurant]"
    },
    common.facebook,
    common.twitter,
    common.instagram,
    common.linkedin,
        {
        label: "Education",
        name: "background[education]",
    },
    {
        label: "Hockey History",
        name: "background[hockey_history]",
        textarea: true
    },

    {
        label: "Other sports played",
        name: "background[other_sports]",
        textarea: true
    },

    {
        label: "Career highlights",
        name: "background[career_highlights]",
        textarea: true
    }
]

