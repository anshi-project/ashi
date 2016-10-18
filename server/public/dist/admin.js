/*global $*/

var defaultHTML="<div class='jumbotron'><h2>Nothing to see here....</h2></div>"

function formatTeamObj(arr){
    var data={};  
    
    arr.forEach(function(v){
       data[v.name]=v.value
    }) 
    if(!data.team) return data;
    
    var teamData=data.team.split(":");
        data.division=teamData[0];
        data.name=teamData[1];
    
    return data;
}

function sendForm(context,url,data){
      $.ajax({
        url:url,
        type:"POST",
        data:data,
        success:function(data){
            context.hide();
            console.log(data)
        }
    })  
}

$(".demo").on("click",function(evt){
    evt.preventDefault();
    var fields=$(this).parent().serializeArray();
    var numberoffields=$(this).siblings("select").length

    if(fields.length!=numberoffields) return alert("Please fill out all fields")

    $(this).hide();
    $(this).siblings().hide();
    var ID=$(this).parent().parent().attr("id");
    var li=$("#"+ID).parent();
    li.css("background","#546");
})


$(".addToTeam").on("click",function(evt){
    evt.preventDefault()
    var ID=$(this).parent().parent().attr("id");
    var context=$("#"+ID).parent();
    var formArr=$(this).parent().serializeArray();
    var data=formatTeamObj(formArr)
    
    var url=$(this).parent("form").attr("action");
    
    if(data.position=="Goalie") url=url.replace("player","goalie");

    return sendForm(context, url, data);
})


$(".addReturningPlayer").on("click",function(evt){
    evt.preventDefault()
    var _data=$(this).parent().serializeArray();
    var data=formatTeamObj(_data);
    var ID=$(this).parent().parent().attr("id");
    var url="/admin/assign/returning-player?id="+ID;
    
    return sendForm($(this).parent(),url,data);
})

$(".new-admin").on("click",function(){
    var url="/admin/grant-access/"+$(this).attr("id");
    $.ajax({
        url:url,
        type:"PUT",
        success:function(d){alert(d)}
    })
})
