var common = require("./common")
var enums = require("./enums")


module.exports = [
    common.firstname,
    common.lastname,
    {
        label:"Team",
        name:"team[name]",
        dropdown:enums.teams.names,
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
        class:"weight", //use same class from weight field on form for formatting sake
        recordOnly:true
    },
    {
        label:"Position",
        name:"team[position]",
        dropdown:enums.player.positions,
        recordOnly:true,
    },
    {
        label:"Shooting hand",
        name:"team[shooting_hand]",
        recordOnly:true,
        dropdown:enums.player.shooting_hand
    },
    {
        label: "Gender",
        name: "public_data[gender]",
        radio: enums.player.gender
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
        dropdown: enums.heights,
        class: 'player-height'
    },
    {
        label: "Birthday",
        name: "public_data[dob]",
        date: 'date',
        month: enums.months,
        day_input: 'birthday-day',
    	year_input: 'birthday-year',
        class: 'birthday',
        hidden: 'public_data[date_of_birth]',
        registration_only:true
    },
    {
        label: "Birthday",
        name: "public_data[date_of_birth]",
        date: 'date',
        month: enums.months,
        day_input: 'birthday-day',
        year_input: 'birthday-year',
        class: 'birthday',
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
        dropdown: enums.states,
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
        radio: enums.teams.applyingFor,
        registration_only:true
    },
    {
        label: "Position",
        name: "hockey_info[position]",
        checkbox: enums.player.positions,
        registration_only:true
    },
    {
        label:"Shooting hand",
        name:"hockey_info[shooting_hand]",
        radio:enums.player.shooting_hand,
        registration_only:true
    },
    {
        label: "Tournament team",
        name: "hockey_info[tournament_team]",
        class: 'optional',
        required:false,
        registration_only:true
    },

    {
        label: "League team",
        name: "hockey_info[league_team]",
        class: 'optional',
        required:false,
        registration_only:true
    },

    {
        label: "League or team website",
        name: "hockey_info[website]",
        class: 'fullwidth optional',
        required:false,
        registration_only:true
    },
    {
        label: "Tournament team",
        name: "team[tournament_team]",
        class: 'optional',
        required:false,
        recordOnly:true
    },

    {
        label: "League team",
        name: "team[league_team]",
        class: 'optional',
        required:false,
        recordOnly:true
    },

    {
        label: "League or team website",
        name: "team[website]",
        class: 'fullwidth optional',
        required:false,
        recordOnly:true
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
