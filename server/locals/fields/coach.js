var common = require("./common")

var shortAnswerQuestions = {
    a: "As A Coach Of Team USA Ball Hockey, You Will Be Working With High Caliber Athletes On A World Level. Please Describe How Your Past Experiences Have Prepared You To Coach Team USA (300-1000 Words)",
    b:"One Of The Challenges Of Competing With Team USA Is That The Players On The Team Come From All Over The Country. Describe How You Would Go About Forming A Team Atmosphere Knowing You Have Athletes From All Around The Country That Will Only Train Together For A Few Weekends Before The Tournament. (150-500 Words)"
}

var teamArray = require("./teams").names
var roles = ["Head Coach", "Assistant Head Coach", "Assistant Coach for Forwards", "Assistant Coach for Defense", "Other"]

module.exports = [
    common.firstname,
    common.lastname,
    common.passport,
    common.passport_exp,
    common.email,
    common.alt_email,
    common.phone1,
    common.phone2,
    common.hometown, 
    {
        label: "Which team are you applying for?",
        name: "background[team_applying_for]",
        radio: ["U16", "U18", "U20", "Men's Master\'s", "Women\'s Master\'s", "Men\'s", "Women\'s"],
        registration_only:true
    }, {
        label: "In the past, I have coached",
        name: "background[former_coaching_positions]",
        checkbox: ["Ice hockey", "Ball hockey", "Field Hockey", "Other"],
        registration_only:true
    }, {
        label: "The highest level I have coached is",
        name: "background[highest_level_coached]",
        radio: ["Youth Hockey", "Junior's", "College", "Semi-Professional", "Professional", "Travel Ball Hockey"],
        registration_only:true
    }, {
        label: "Preferred coaching position",
        name: "background[preferred_coaching_position]",
        radio: roles,
        registration_only:true
    },
    common.shirt,
    common.polo,
    common.jacket,
    common.hat,
    common.facebook,
    common.twitter,
    common.instagram,
    common.linkedin, 
        {
        label: shortAnswerQuestions.a,
        name: "background[short_answers][preparation]",
        textarea: true,
        registration_only:true
    }, {
        label: "Please describe your coaching style",
        name: "background[short_answers][coaching_style]",
        textarea: true,
        registration_only:true
    },

    {
        label:"What makes you a good candidate to coach ball hockey?",
        name: "background[short_answers][why_a_good_candidate]",
        textarea: true,
        registration_only:true
    },
    {
        label:shortAnswerQuestions.b,
        name: "background[short_answers][create_team_atmosphere]",
        textarea: true,
        registration_only:true
    },

    {
        label: "Career highlights",
        name: "background[career_highlights]",
        textarea: true
    },
    {
        label: "Team",
        name:"team[name]",
        dropdown:teamArray,
        recordOnly:true,
        fields2:true
    },
    {
        label: "Role",
        name:"team[role]",
        dropdown:roles,
        recordOnly:true,
        fields2:true
    },    
    {
        label: "Team",
        name:"team2[name]",
        dropdown:teamArray,
        recordOnly:true,
        fields2:true
    },
    {
        label: "Role",
        name:"team2[role]",
        dropdown:roles,
        recordOnly:true,
        fields2:true
    },     
    {
        label: "Team",
        name:"team3[name]",
        dropdown:teamArray,
        recordOnly:true,
        fields2:true
    }, 
        {
        label: "Role",
        name:"team3[role]",
        dropdown:roles,
        recordOnly:true,
        fields2:true
    },        
]
