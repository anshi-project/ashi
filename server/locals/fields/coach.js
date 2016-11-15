var common = require("./common")

var shortAnswerQuestions = {
    a: "As A Coach Of Team USA Ball Hockey, You Will Be Working With High Caliber Athletes On A World Level. Please Describe How Your Past Experiences Have Prepared You To Coach Team USA (300-1000 Words)",
    b:"One Of The Challenges Of Competing With Team USA Is That The Players On The Team Come From All Over The Country. Describe How You Would Go About Forming A Team Atmosphere Knowing You Have Athletes From All Around The Country That Will Only Train Together For A Few Weekends Before The Tournament. (150-500 Words)"
}

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
        radio: ["U16", "U18", "U20", "Men's Master\'s", "Women\'s Master\'s", "Men\'s", "Women\'s"]
    }, {
        label: "In the past, I have coached",
        name: "background[former_coaching_positions]",
        checkbox: ["Ice hockey", "Ball hockey", "Field Hockey", "Other"]
    }, {
        label: "The highest level I have coached is",
        name: "background[highest_level_coached]",
        radio: ["Youth Hockey", "Junior's", "College", "Semi-Professional", "Professional", "Travel Ball Hockey"]
    }, {
        label: "Preferred coaching position",
        name: "background[preferred_coaching_position]",
        radio: ["Head Coach", "Assistant Head Coach", "Assistant Coach for Forwards", "Assistant Coach for Defense", "Other"]
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
        textarea: true
    }, {
        label: "Please describe your coaching style",
        name: "background[short_answers][coaching_style]",
        textarea: true
    },

    {
        label:"What makes you a good candidate to coach ball hockey?",
        name: "background[short_answers][why_a_good_candidate]",
        textarea: true
    },
    {
        label:shortAnswerQuestions.b,
        name: "background[short_answers][create_team_atmosphere]",
        textarea: true
    },

    {
        label: "Career highlights",
        name: "background[career_highlights]",
        textarea: true
    }
]
