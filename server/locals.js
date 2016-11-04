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
    {division:"Men's",name:"Men's Team USA"}, 
    {division:"Women's",name:"Women's Team USA"}, 
    {division:"Men's Master's",name:"Men's Master's Team USA"}, 
    {division:"Men's Master's",name:"Men's Master's Team DC"}, 
    {division:"Women's Master's",name:"Women's Team Red"},
    {division:"Women's Master's",name:"Women's Team Blue"}
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

module.exports={
    states:states,
    heights:heights,
    players:players,
    teams:teams,
    heights:heights,
    apparel:apparel
};
