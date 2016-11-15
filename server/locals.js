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

var jerseySizes=sizes.concat([{size:"Goalie-XXL"},{size:"Goalie-XXXL"}]);
var sockSizes= [{size:"M"},{size:"L"},{size:"XL"}];

var apparel=[
    {name:"shirt",sizes},
    {name:"polo",sizes},
    {name:"jacket",sizes},
    {name:"hat",sizes:[{size:"S/M"},{size:"L/XL"}]}
    ]                      

var playerApparel=[
    {name:"jersey", sizes:jerseySizes},
    {name:"socks",sizes:sockSizes},
    {name:"shorts",sizes}
]

module.exports={
    states,
    heights,
    teams,
    heights,
    apparel,
    playerApparel
};
