var player={public_data:["lastname","firstname","gender","height","weight","date_of_birth","email"],social_media:["facebook","twitter","instagram","linkedin"],
            apparel:["jersey","shorts","socks","shirt","polo","hat","jacket"],
            hockey_info:["team","position","tournament_team","leaugue_team","website"],
            bio:["education","hometown","hockey_history","other_sports","career_highlights"],
            lifestyle:["movie","tvshow","athlete","other_sport","food"],
            contact:["phone1","phone2","guardian_name","guardian_phone","street","city","state","zipcode","passport","passport_expiration"]}

var coach={contact:["lastname","firstname","email","alt_email","street","state","city","zipcode","passport","passport_expiration","phone"],social_media:player.social_media,
            apparel:["shirt","jacket","hat","polo"],
            coaching_info:["former_coaching_positions","highest_level_coached","preferred_coaching_positions","team_applying_for"],
            short_answers:["career_highlights","preparation","why_a_good_candidate","create_team_atmosphere"]}            

var manager={contact:coach.contact,apparel:coach.apparel}





function createObj(arr,form){
    var obj={};
    arr.forEach(function(val){
        obj[val]=form[val]
    })
    return obj;
}


function getFieldsFromType(type){
    var obj;
    switch (type){
        case "player":
         obj=player;
         break;
        case "coach":
         obj=coach;
         break;
        case "manager":
         obj=manager;
         break; 
        default: 
         obj={};
    }
    return obj
}





module.exports=function(formBody,type){
    var fields=getFieldsFromType(type);
    var fieldsArray=Object.keys(fields);
    var registration={}
     
    for(var i=0;i<fieldsArray.length;i++){
         var prop=fieldsArray[i];
         var vals=fields[prop];
        registration[prop]=createObj(vals,formBody);
    }
    
    if(type=="player"){
        registration.jersey_number_choices=[+formBody.choice1,+formBody.choice2,+formBody.choice3];
    }
    if(formBody.username) registration.username=formBody.username; 
    
    return registration;
}