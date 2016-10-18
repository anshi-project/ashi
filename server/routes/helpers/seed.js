var randomNum=function(start,end){
    return Math.floor(Math.random()*(end)+start)
}

var randomJerseyNumbers=function(){
    return [randomNum(0,33),randomNum(33,66),randomNum(66,100)]
}



exports.players=[
    {_id:1, lastname:"Cave",firstname:"Colby",hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:2, lastname:"Bergeron",firstname:"Patrice",hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:3, lastname:"Bonino",firstname:"Nick",hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:4, lastname:"Ferlin",firstname:"Brian",hockey_info:{team:"U16",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:5, lastname:"Smith",firstname:"Steve",hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:6, lastname:"Williams",firstname:"Evan",hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:7, lastname:"Beam",firstname:"Jim",hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:77, lastname:"Daniels",firstname:"Jack",hockey_info:{team:"U18",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:8, lastname:"Waters",firstname:"Roger",hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:9, lastname:"Mason",firstname:"Nick",hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:22, lastname:"Wright",firstname:"Richard",hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()},
    {_id:15, lastname:"Gilmour",firstname:"David",hockey_info:{team:"U20",division:"Junior's"},jersey_number_choices:randomJerseyNumbers()}    
]



exports.teams=[
    {division:"Junior's",name:"U16"},    
    {division:"Junior's",name:"U18"}, 
    {division:"Junior's",name:"U20"}, 
    {division:"Men's",name:"Team USA"}, 
    {division:"Women's",name:"Team USA"}, 
    {division:"Men's Master's",name:"Men's Team USA"}, 
    {division:"Men's Master's",name:"Men's Team DC"}, 
    {division:"Women's Master's",name:"Women's Team Red"},
    {division:"Women's Master's",name:"Women's Team Blue"}
]

exports.createPlayer=function(last,first){
return {
    "firstname": first,
    "lastname": last,
    "apparel": {
        "jacket": "L",
        "hat": "L/XL",
        "polo": "XL",
        "shirt": "M",
        "jersey":"L",
        "shorts": "M"
    },
    "jersey_number_choices":randomJerseyNumbers(),
    "hockey_info": {
        "shooting_hand": "left",
        "website": "",
        "tournament_team": "",
        "leaugue_team": "N/A"
    },
    "lifestyle": {
        "movie": "Star Wars",
        "tvshow": "Home Improvement",
        "athlete": "Tom Brady",
        "other_sport": "Football",
        "food": "Dennys"
    },
    "bio": {
        "education": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        "hometown": "Sharon, MA",
        "hockey_history": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        "other_sports": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        "career_highlights": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    "contact": {
        "passport": "no",
        "zipcode": "02067",
        "state": "MA",
        "city": "Sharon",
        "street": "26 Clarke St",
        "guardian_phone": "",
        "guardian_name": "",
        "phone2": "",
    },
    "public_data": {
        "email": "adam_stein@student.uml.edu",
        "date_of_birth": "02-21-1990",
        "weight": "184",
        "height": "5'11\"",
        "gender": "male",
        "phone1": "7847813521"
    }
}
}

