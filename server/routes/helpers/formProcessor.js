function createObj(arr,form){
    var obj={};
    arr.forEach(function(val){
        obj[val]=form[val]
    })
    return obj;
}


module.exports=function(formBody,type){
    var fields=require("./"+type);
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