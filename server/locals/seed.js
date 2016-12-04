
	var schema= {

    "apparel": {
        "jersey": "L",
        "shorts": "XL",
        "socks": "L",
        "hat": "L/XL",
        "jacket": "L",
        "polo": "XXL",
        "shirt": "XXXL"
    },
    "status": "Active",
    "hockey_info": {
        "team": "Women's Master's",
        "tournament_team": "",
        "position":["Goalie"],
        "shooting_hand":"Left",
        "league_team": "",
        "website": "",
        "jersey_number": {
            "choice1": 2,
            "choice2": 6,
            "choice3": 87
        }
    },
    "contact": {
        "passport": "No",
        "email": "sven23@hotmail.com",
        "alt_email": "",
        "phone1": "(329) 430-2355",
        "private_data": {
            "address": {
                "street": "123 elm st",
                "city": "springfield",
                "state": "AK",
                "zipcode": "03294"
            },
            "guardian_number": "(121) 222-22228",
            "guardian_name": "Dave"
        },
        "passport_expiration": "",
        "phone2": ""
    },
    "favorite": {
        "movie": "Blank Check",
        "tv_show": "30 Minute Meals",
        "sports_team": "Raptors",
        "athlete": "Shaq",
        "other_sport": "Frisbee",
        "food_or_restaurant": "Veal"
    },
    "background": {
        "hometown": "Lowell, MA",
        "education": "Harvard Law",
        "hockey_history": "Thats ancient history ",
        "other_sports": "frolf",
        "career_highlights": "no",
        "social_media": {
            "linkedin": "",
            "instagram": "",
            "twitter": "",
            "facebook": ""
        }
    },
    "public_data": {
        "gender": "Male",
        "weight": "214",
        "height": "6'8\"",
        "date_of_birth": "11/12/1956"
    },
    "headshot": false,
    "paid": false,
 }

var positions = ["Right Wing", "Left Wing", "Goalie", "Center","Left Defense", "Right Defense"]
var teams = require("./fields/teams").names
var names = [{firstname:"Bill",lastname:"Monroe"},{firstname:"Carl",lastname:"Weathers"},{firstname:"Corrine",lastname:"Nyguen"}
,{firstname:"Rebecca",lastname:"John"},{firstname:"Heather",lastname:"Thompson"}]

module.exports = names.map(function(v){
    var teamName = teams[Math.floor(Math.random()*9)]
    var position = positions[Math.floor(Math.random()*5)]
    schema.hockey_info = Object.assign({},schema.hockey_info, {position, team:teamName})
    return Object.assign({}, schema, v) 
})