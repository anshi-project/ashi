/*global $*/

var defaultHTML="<div class='jumbotron'><h2>Nothing to see here....</h2></div>"

function formatTeamObj(arr){
    var data={};  
    
    arr.forEach(function(v){
       data[v.name]=v.value
    }) 
    
    var teamData=data.team.split(":");
        data.division=teamData[0];
        data.name=teamData[1];
    
    return data;
}



$(".addToTeam").on("click",function(evt){
    evt.preventDefault()
    var ID=$(this).parent().parent().attr("id");
    var formArr=$(this).parent().serializeArray();
    var data=formatTeamObj(formArr)
    
    var applicant=data.role? "coach/":"new/"
    var type="";
    
    if(applicant=="new/"){
        if(data.position=="Goalie"){
            type="goalies";
        }else{
            type="players"
        }
    }

    $.ajax({
        url:"/admin/submit/"+applicant+type+"?id="+ID,
        type:"POST",
        data:data,
        success:function(data){
            $("#"+ID).parent().hide();

            console.log(data)
        }
    })
})

