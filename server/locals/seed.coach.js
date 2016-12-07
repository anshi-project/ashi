var _ = require("lodash");
var enums = require("./fields/enums")	
 
 function randomDate(){
    return _.random(1,12)+"/"+_.random(1,31)+"/"+_.random(1980,2000);
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
        "hat": enums.apparelSizes.hat[_.random(0,1)],
        "jacket": enums.apparelSizes.default[_.random(0,5)],
        "polo": enums.apparelSizes.default[_.random(0,5)],
        "shirt": enums.apparelSizes.default[_.random(0,5)]
    },

    "contact": {
        "passport": "No",
        "email": name[0]+_.random(1,40)+"@gmail.com",
        "alt_email": "",
        "phone1": _.random(1000000000,9999999999),
        "passport_expiration": "",
        "phone2": ""
    },

    "background": {
        "hometown": "West Roxbury, MA",
        "team_applying_for": "U20",
        "highest_level_coached": "College",
        "preferred_coaching_position": "Head Coach",
        "short_answers": {
            "preparation": "sgfgdfgdf",
            "coaching_style": "fdsdfsdfsdfsdf",
            "why_a_good_candidate": "dfdsfddddddd",
            "create_team_atmosphere": "dsfsdfsdfdfsf"
        },
        "former_coaching_positions": [
            "Ice Hockey",
            "Other"
        ],
        "social_media": {
            "linkedin": `http://www.linkedin.com/${name[0]}.${name[1]}.${_.random(20,400)}`,
            "instagram": `http://www.instagram.com/${name[1]}${_.random(0,40)}`,
            "twitter": `http://www.twitter.com/user/${name[0]}`,
            "facebook": `http://www.facebook.com/${name[0]}.${name[1]}.${_.random(20,400)}`
        }
    },
 }
}
