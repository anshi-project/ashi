var _ = require("lodash");

var player={

    part1:[{label:"First Name",name:"firstname",type:"text"},
           {label:"Last Name",name:"lastname",type:"text"},
           {label:"Birthday",name:"public_data[date_of_birth]",type:"date"},
           {label:"Gender",name:"public_data[gender]",type:"text"},
           {label:"Weight",name:"public_data[weight]",type:"number"},
           {label:"Height",name:"public_data[height]" ,type:"text"},
           {label:"Team",name:"team[name]",type:"text", class:"team-dropdown"},
           {label:"Position",name:"team[position]",type:"text",class:"position-dropdown"},
           {label:"Jersey Number",name:"team[jersey_number]",type:"text"},
           {label:"Shooting Hand",name:"team[shooting_hand]",type:"text"}],
    part2:[
        {label:"Email",name:"contact[email]", type:"email"},
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
        {label:"Parent/Guardian Number",name:"contact[private_data][guardian_number]"}
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
        {label:"Jersey # 1st choice",name:"hockey_info[jersey_number][choice1]",type:"number"},
        {label:"Jersey # 2nd choice",name:"hockey_info[jersey_number][choice2]",type:"number"},
        {label:"Jersey # 3rd choice",name:"hockey_info[jersey_number][choice3]",type:"number"},
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

var manager={
    part1:[{label:"First Name",name:"firstname",type:"text"},
           {label:"Last Name",name:"lastname",type:"text"},
           {label:"Division",name:"division",class:"division-dropdown"},
           {label:"Username",name:"username",type:"text"},
           {label:"Email",name:"contact[email]" ,type:"email"},
           {label:"Alt Email",name:"contact[alt_email]"},
           {label:"Phone",name:"contact[phone1]"},
           {label:"Alt Phone",name:"contact[phone2]"}],

    part2:[        
        {label:"Shirt size",name:"apparel[shirt]"},
        {label:"Jacket size",name:"apparel[jacket]"},
        {label:"Hat size",name:"apparel[hat]"},
        {label:"Polo size",name:"apparel[polo]"}
    ]
}

var coach={
    part1:[{label:"First Name",name:"firstname",type:"text"},
           {label:"Last Name",name:"lastname",type:"text"},
           {label:"Team",name:"team[name]", type:"text", class:"team-dropdown"},
           {label:"Role",name:"team[role]", type:"text"},
           {label:"Passport",name:"contact[passport]"},       
           {label:"Passport Exp",name:"contact[passport_expiration]"},                      
           {label:"Phone",name:"contact[phone1]"},
           {label:"Alt Phone",name:"contact[phone2]"},           
           {label:"Email",name:"contact[email]", type:"email"},
           {label:"Alt Email",name:"contact[alt_email]"}],

    part2:[        
        {label:"Facebook",name:"contact[social_media][facebook]"},
        {label:"Instagram",name:"contact[social_media][instagram]"},
        {label:"Twitter",name:"contact]social_media][twitter]"},
        {label:"Linkedin",name:"contact]social_media][linkedin]"},     
        {label:"Shirt size",name:"apparel[shirt]"},
        {label:"Jacket size",name:"apparel[jacket]"},
        {label:"Hat size",name:"apparel[hat]"},
        {label:"Polo size",name:"apparel[polo]"}
    ]
}

var fields={player,coach,manager}

module.exports=function(type,queryResults){
   var model=fields[type];
   var res={};
   
   for (var prop in model) {
     var x=model[prop].map(v=> {
        return Object.assign({},v,{value:_.result(queryResults, v.name)||"N|A" })
    })
      res[prop]=x;
   }
   return res;
}

