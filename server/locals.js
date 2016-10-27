var players=[
    {lastname:"Cave",firstname:"Colby"},
    {lastname:"Bergeron",firstname:"Patrice"},
    {lastname:"Bonino",firstname:"Nick"},
    {lastname:"Ferlin",firstname:"Brian"},
    {lastname:"Smith",firstname:"Steve"},
    {lastname:"Williams",firstname:"Evan"},
    {lastname:"Beam",firstname:"Jim"},
    { lastname:"Daniels",firstname:"Jack"},
    {lastname:"Waters",firstname:"Roger"},
    {lastname:"Mason",firstname:"Nick"},
    { lastname:"Wright",firstname:"Richard"},
    { lastname:"Gilmour",firstname:"David"}    
]

var teams=[
    {division:"Junior's",name:"U16"},    
    {division:"Junior's",name:"U18"}, 
    {division:"Junior's",name:"U20"}, 
    {division:"Men's",name:"Team USA"}, 
    {division:"Women's",name:"Team USA"}, 
    {division:"Men's Master's",name:"Men's Master's Team USA"}, 
    {division:"Men's Master's",name:"Men's Master's Team DC"}, 
    {division:"Women's Master's",name:"Women's Master's Team Red"},
    {division:"Women's Master's",name:"Women's Master's Team Blue"}
]

var states=["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL",
          "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", 
          "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", 
          "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", 
          "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

var heights=["4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"",
                "5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"",
                "6'1\"","6'2\"","6'3\"","6'4\"","6'5\"","6'6\"","6'7\"","6'8\"",
                "6'9\"","6'10\"","6'11\"","7'0\""];

var sizes=["SM","M","L","XL","XXL","XXXL"]
sizes=sizes.map(v=>{return{size:v}});

var apparel=[
    {name:"shirt",sizes:sizes},
    {name:"polo",sizes:sizes},
    {name:"jacket",sizes:sizes},
    {name:"hat",sizes:[{size:"SM/MD"},{size:"L/XL"}]}
    ]                      


function createDoc(first,last){
return{

    "firstname": first,
    "lastname": last,
    "apparel": {
        "jersey": "XL",
        "socks": "L",
        "shorts": "XL",
        "hat": "L/XL",
        "jacket": "M",
        "polo": "XL",
        "shirt": "L"
    },
    "registration_status": "pending",
    "hockey_info": {
        "team": "U18",
        "position": "right_defense",
        "shooting_hand": "left",
        "jersey_number": {
            "choice1": 3,
            "choice2": 6,
            "choice3": 9
        },
        "website": "",
        "leaugue_team": "N/A",
        "tournament_team": ""
    },
    "favorite": {
        "movie": "Braveheart",
        "athlete": "Tom Brady",
        "sports_team": "New England Patriots",
        "other_sport": "Football",
        "food_or_restaurant": "Indian Food"
    },
    "background": {
        "hometown": "Sharon, MA",
        "education": "Berklee College Of Music",
        "hockey_history": "Once set, the value of app.locals properties persist throughout the life of the application, in contrast with res.locals properties that are valid only for the lifetime of the request.\r\n\r\nYou can access local variables in templates rendered within the application. This is useful for providing helper functions to templates, as well as application-level data. Local variables are available in middleware via req.app.locals (see req.app)",
        "other_sports": "Once set, the value of app.locals properties persist throughout the life of the application, in contrast with res.locals properties that are valid only for the lifetime of the request.\r\n\r\nYou can access local variables in templates rendered within the application. This is useful for providing helper functions to templates, as well as application-level data. Local variables are available in middleware via req.app.locals (see req.app)",
        "career_highlights": "Once set, the value of app.locals properties persist throughout the life of the application, in contrast with res.locals properties that are valid only for the lifetime of the request.\r\n\r\nYou can access local variables in templates rendered within the application. This is useful for providing helper functions to templates, as well as application-level data. Local variables are available in middleware via req.app.locals (see req.app)"
    },
    "contact": {
        "social_media": {
            "linkedin": "",
            "instagram": "",
            "twitter": "",
            "facebook": ""
        },
        "private_data": {
            "address": {
                "zipcode": "02134",
                "state": "MA",
                "city": "Allston",
                "street": "26 Parkvale Ave"
            }
        },
        "phone2": "",
        "phone1": "7817842528",
        "alt_email": "",
        "email": "adamhs3521@gmail.com",
        "passport_expiration": "2021-04-19",
        "passport": "yes"
    },
    "public_data": {
        "date_of_birth": "1986-11-02",
        "height": "6'0\"",
        "weight": "168",
        "gender": "male"
    }
}}

var docs=players.map(v=> {return createDoc(v.firstname,v.lastname)})

module.exports={states:states,heights:heights,players:players,docs:docs, teams:teams,heights:heights,apparel:apparel};
