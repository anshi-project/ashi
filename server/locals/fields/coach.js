var common = require("./common")
var enums = require("./enums")

var shortAnswerQuestions = {
    a: `As a coach of Team USA Ball Hockey, you will be working with high caliber athletes
        on a world level. Please describe how your past experiences have prepared you to
        coach Team USA (300-1000 words)`,
    b: `One of the challenges of competing with team USA is that the players on the team
        come from all over the country. Describe how you would go about forming a team
        atmosphere knowing you have athletes from all around the country that will
        only train together for a few weekends before the tournament. (150-500 words)`
}


module.exports = [
    common.firstname,
    common.lastname,
    {
        label: "Team",
        name:"team[name]",
        dropdown:enums.teams,
        recordOnly:true
    },
    {
        label: "Role",
        name:"team[role]",
        dropdown:enums.roles,
        recordOnly:true
    },
    common.passport,
    common.passport_exp,
    common.passport_expiration,
    common.email,
    common.alt_email,
    common.phone1,
    common.phone2,
    common.hometown,
    {
        label: "Which team are you applying for?",
        name: "background[team_applying_for]",
        radio: enums.teams.applyingFor,
        registration_only:true
    }, {
        label: "In the past, I have coached",
        name: "background[former_coaching_positions]",
        checkbox: enums.former_coaching_positions,
        registration_only:true
    }, {
        label: "The highest level I have coached is",
        name: "background[highest_level_coached]",
        radio: enums.highest_level_coached,
        registration_only:true
    }, {
        label: "Preferred coaching position",
        name: "background[preferred_coaching_position]",
        radio: enums.roles,
        registration_only:true
    },
    common.shirt,
    common.polo,
    common.jacket,
    common.hat,
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
    common.facebook,
    common.twitter,
    common.instagram,
    common.linkedin,
]
