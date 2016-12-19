$(function(){
	
	
	function swapState(){
		var data = $(this).data()
		
		if($(this).hasClass("btn-danger")){
			$(this).addClass("btn-warning").removeClass("btn-danger")
			$(this).text("New Season")
			$(this).css({color:"black"})
			data.restore = false;
		}else{
			$(this).removeClass("btn-warning").addClass("btn-danger")
			$(this).text("Restore Last Season");
			$(this).css({color:"white"})
			data.restore = true;
		}
	}
	
	$(".season-btn").on("click",function(){
		var teamName = $(this).data("team");
		var restore = $(this).data("restore")
		var q = restore? "&restore=true" : "";

		var swap = swapState.bind(this)

		$.ajax({
			type:"PUT",
			url:"/admin/new/season?name="+teamName+q,
		
			success:function(data){
				swap()
				toastr.success(data);
			},
			error:function(data){
				toastr.error(data.responseText)
			}
		})
	})

	$('#seasons-modal').modal('show');

})