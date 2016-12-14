var _ = require("lodash");
var enums = require("./fields/enums")	
 
 function randomDate(){
    return _.random(1980,2000)+"-"+_.random(1,12)+"-"+_.random(1,31);
}

function valiDATE(){
  var str = randomDate();
  var date = new Date(str);

  while(date == "Invalid Date"){
    str = randomDate();
    date = new Date(str);
  }
 
  return str;
}

module.exports = function(name){
    name= name.split(" ");

    return{
    firstname:name[0],
    lastname:name[1],
    "apparel": {
        "jersey": enums.apparelSizes.jersey[_.random(0,5)],
        "shorts": enums.apparelSizes.default[_.random(0,5)],
        "socks": enums.apparelSizes.socks[_.random(0,2)],
        "hat": enums.apparelSizes.hat[_.random(0,1)],
        "jacket": enums.apparelSizes.default[_.random(0,5)],
        "polo": enums.apparelSizes.default[_.random(0,5)],
        "shirt": enums.apparelSizes.default[_.random(0,5)]
    },
    
    "hockey_info": {
        "team": enums.teams.applyingFor[_.random(0,6)],
        "tournament_team": "",
        "position":enums.player.positions[_.random(0,5)],
        "shooting_hand": enums.player.shooting_hand[_.random(0,1)],
        "league_team": "",
        "website": "",
        "jersey_number": {
            "choice1": 2,
            "choice2": _.random(0, 99),
            "choice3": _.random(0, 99)
        }
    },
    "contact": {
        "passport_expiration": Date.parse("2025-2-3"), 
        "email": name[0]+_.random(1,40)+"@gmail.com",
        "alt_email": "",
        "phone1": "2323352233",
        "private_data": {
            "address": {
                "street": "123 elm st",
                "city": "springfield",
                "state": "AK",
                "zipcode": "03294"
            },
            "guardian_number": _.random(1000000000,9999999999),
            "guardian_name": `Dave ${_.capitalize(name[1])}`
        },
       
        "phone2": ""
    },
    "favorite": {
        "movie": "The English Patient",
        "tv_show": "30 Minute Meals",
        "sports_team": "Raptors",
        "athlete": "Shaq",
        "other_sport": "Frisbee",
        "food_or_restaurant": "Veal"
    },
    "background": {
        "hometown": "Lowell, MA",
        "education": "Harvard Law",
        "hockey_history": "I have amnesia, what is this form for again?",
        "other_sports": "frolf",
        "career_highlights": " blah blah blahhhhhhhhhh",
        "social_media": {
            "linkedin": `http://www.linkedin.com/${name[0]}.${name[1]}.${_.random(20,400)}`,
            "instagram": `http://www.instagram.com/${name[1]}${_.random(0,40)}`,
            "twitter": `http://www.twitter.com/user/${name[0]}`,
            "facebook": `http://www.facebook.com/${name[0]}.${name[1]}.${_.random(20,400)}`
        }
    },
    "public_data": {
        "gender": enums.player.gender[ _.random(0,1)],
        "weight": _.random(100,250),
        "height": enums.heights[_.random(0, enums.heights.length-1)],
        "date_of_birth": valiDATE()
    }
 }
}
