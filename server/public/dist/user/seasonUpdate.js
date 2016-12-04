$(function(){


var upToDateTeams = $(".bg-success").length;
	
	
	$(".season-btn").on("click",function(){
		var teamName = $(this).data("team");
		var restore = $(this).data("restore")
		var q = restore? "&restore=true" : "";
		$.ajax({
			type:"PUT",
			url:"/admin/new/season?restore=true&name="+teamName+q,
		
			success:data=>{console.log(data)}
		})
	})


	if($(".bg-success").length != 9 ){
		$('#seasons-modal').modal('show');
	}else{
		$("#seasons-modal").html("")
	}
})