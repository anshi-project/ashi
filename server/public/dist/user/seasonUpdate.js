$(function(){
	
	
	
	$(".season-btn").on("click",function(){
		var teamName = $(this).data("team");
		var restore = $(this).data("restore")
		var q = restore? "&restore=true" : "";
		


		$.ajax({
			type:"PUT",
			url:"/admin/new/season?name="+teamName+q,
		
			success:data=>{
				toastr.success(data);
			},
			failure:data=>{
				toastr.error(data)
			}
		})
	})

	$('#seasons-modal').modal('show');

})