var player={public_data:["gender","height","weight","date_of_birth","email"],social_media:["facebook","twitter","instagram","linkedin"],
            apparel:["jersey","shorts","socks","shirt","polo","hat","jacket"],
            hockey_info:["team","position","tournament_team","leaugue_team","website","shooting_hand"],
            bio:["education","hometown","hockey_history","other_sports","career_highlights"],
            lifestyle:["movie","tvshow","athlete","other_sport","food"],
            contact:["phone1","phone2","guardian_name","guardian_phone","street","city","state","zipcode","passport","passport_expiration"]}

var coach={contact:["email","alt_email","passport","passport_expiration","phone1","phone2"],
            social_media:player.social_media,
            apparel:["shirt","jacket","hat","polo"],
            coaching_info:["former_coaching_positions","highest_level_coached","preferred_coaching_positions","team_applying_for"],
            short_answers:["career_highlights","preparation","why_a_good_candidate","create_team_atmosphere"]}            

var manager={contact:coach.contact,apparel:coach.apparel}

var _fields={player:player,coach:coach,manager:manager}




function createObj(arr,form){
    var obj={};
    arr.forEach(function(val){
        obj[val]=form[val]
    })
    return obj;
}
function formatDate(_date){
    if(!_date) return;
    
    var d=_date.split("-");
    return d[1]+"-"+d[2]+"-"+d[0];
}

function createAdmin(formBody){
    var _=formBody;
    return {
        firstname:_.firstname,
        lastname:_.lastname,
        password:_.password,
        username:_.username,
        applyingForAdmin:true,
        contact:{
            email:_.email,
            alt_email:_.alt_email,
            phone1:_.phone1,
            phone2:_.phone2
        }
    }
}


module.exports=function(formBody,type){
    
    if(type="admin") return createAdmin(formBody);


    var fields=_fields[type];
    var fieldsArray=Object.keys(fields);
    var registration={firstname:formBody.firstname,lastname:formBody.lastname};
    


    formBody.passport_expiration=formatDate(formBody.passport_expiration);
    if(type=="player") formBody.date_of_birth=formatDate(formBody.date_of_birth);

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