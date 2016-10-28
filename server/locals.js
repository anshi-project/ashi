var _ = require("lodash");

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

var fields={

    part1:[{label:"First Name",name:"firstname",type:"text"},
           {label:"Last Name",name:"lastname",type:"text"},
           {label:"Birthday",name:"public_data[date_of_birth]",type:"date"},
           {label:"Gender",name:"public_data[gender]",type:"text"},
           {label:"Weight",name:"public_data[weight]",type:"number"},
           {label:"Height",name:"public_data[height]" ,type:"text"},
           {label:"Team",name:"team[name]",type:"text" },
           {label:"Position",name:"team[position]",type:"text"},
           {label:"Jersey Number",name:"team[jersey_number]",type:"text"},
           {label:"Shooting Hand",name:"team[shooting_hand]",type:"text"}],
    part2:[
        {label:"Email",name:"contact[email]"},
        {label:"Alt Email",name:"contact[alt_email]"},
        {label:"Phone",name:"contact[phone1]"},
        {label:"Alt Phone",name:"contact[phone2]"},
        {label:"Passport",name:"contact[passport]"},
        {label:"Facebook",name:"contact[social_media][facebook]"},
        {label:"Instagram",name:"contact[social_media][instagram]"},
        {label:"Twitter",name:"contact]social_media][twitter]"},
        {label:"Linkedin",name:"contact]social_media][linkedin]"},        
        {label:"Passport Exp",name:"contact[passport_expiration]"},
        {label:"street",name:"contact[private_data][address][street]"},
        {label:"City",name:"contact[private_data][address][city]"},
        {label:"State",name:"contact[private_data][address][state]"},
        {label:"Zipcode",name:"contact[private_data][address][zipcode]"},
        {label:"Parent/Guardian Name",name:"contact[private_data][guardian_name]"},
        {label:"Parent/Guardian Name",name:"contact[private_data][guardian_number]"}
        ],
    part3:[
        {label:"Tournament Team",name:"hockey_info[tournament_team]"},
        {label:"League Team",name:"hockey_info[league_team]"},
        {label:"Website",name:"hockey_info[website]"},
        {label:"Shirt size",name:"apparel[shirt]"},
        {label:"Sock size",name:"apparel[socks]"},
        {label:"Jacket size",name:"apparel[jacket]"},
        {label:"Hat size",name:"apparel[hat]"},
        {label:"Polo size",name:"apparel[polo]"},
        {label:"Shorts size",name:"apparel[shorts]"},
        {label:"Jersey size",name:"apparel[jersey]"},
        {label:"Education",name:"background[education]"},
        {label:"Hometown",name:"background[hometown]"},
        {label:"Favorite Movie",name:"favorite[movie]"},
        {label:"Favorite TV show",name:"favorite[tv_show]"},
        {label:"Favorite Athlete",name:"favorite[athlete]"},
        {label:"Favorite sport (not hockey)",name:"favorite[other_sport]"},
        {label:"Favorite food/restaurant",name:"favorite[food_or_restaurant]"}
        ],
    part4:[
        {label:"Hockey History",name:"background[hockey_history]"},
        {label:"Other sports played",name:"background[other_sports]"},
        {label:"Career highlights",name:"background[career_highlights]"},
        ]    
}

function mapFieldsFromData(data){
   var res={};
   
   for (var i = 1; i <= 4; i++) {
     var x=fields["part"+i].map(v=> {return Object.assign({},v,{value:_.result(data, v.name)||"N|A" })})
      res["part"+i]=x;
   }
   return res;
}




module.exports={
    states:states,
    heights:heights,
    players:players, 
    fields:mapFieldsFromData, 
    teams:teams,
    heights:heights,
    apparel:apparel
};
