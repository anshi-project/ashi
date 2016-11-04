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

$(".admin-permission").each(function(){
  if($(this).parent().parent().hasClass("row-Active")){
    $(this).text("Revoke Permissions");
  }
})

$(".admin-permission").on("click",function(){
    var self=this;
    var url="/admin/permissions?type=admin&id="+$(this).attr("id");
    var flag= $(this).hasClass("row-Active");
    var newText=flag? "Grant Permissions" : "Revoke Permissions";
    var currClass=flag? "Active":"inactive";
    var newClass=flag? "inactive" : "Active";
    

    $.ajax({
        url:url,
        type:"PUT",
        data:{status:newClass},
        success:function(d){
            $(self).text(newText);
            $(self).parent().prev().text(newClass);
            $(self).parent().parent().removeClass("row-"+currClass).addClass("row-"+newClass);
        }
    })
})

$(".manager-division-update-btn").on("click",function(){
    var self=this;
    var id=$(this).parent().parent().attr("id");
    var division=$(this).prev().val();
    var status=division=="none"? "inactive": "active";

    $.ajax({
        url:"/admin/permissions/gm?&id="+id,
        data:{division,status},
        type:"PUT",
        success:function(data){
            console.log(data);
        }
    })
})

// $('#coach-modal').on('show.bs.modal', function (event) {
//       var button = $(event.relatedTarget) 
//       var coach = button.data('coach');
//       var hidden=button.data("hide");
//       var visible=button.data("show")
//       var formID=button.data("url");

//       var newCoach=visible.split(",").length==2;
//       var field=newCoach? null : visible;

//       if(field&&field==".coach-team"){
//         field="name";
//       }else if(field&& field==".coach-role"){
//         field="role";
//       }
//       var url="/admin/permissions/coach?_method=PUT&id="+formID+"&new="+newCoach+"&field="+field;

//       var modal = $(this);
      
//       modal.find('.modal-title').text(coach);
//       modal.find(hidden).hide().attr("disabled",true).attr("required",false);
//       modal.find(visible).show().attr("disabled",false).attr("required",true);
//       $("#update-coach").attr("action",url)   
// })
