$(function(){
	var recipients;
	var cc;
	var $loading = $('#loading')
	$(document)
  		.ajaxStart(function () {
  			$("body").attr("disabled","true").css("opacity",".6");
  		})
  		.ajaxStop(function () {
  			$("body").attr("disabled","false").css("opacity","1")
  			
  		});


	$(".email-btn").on("click",function(){
		recipients = $(".team-table-active .email-cell").text().trim();
		cc = $(".team-table-active .email-cc").text();
	})

	$(".send-email-btn").on("click",function(){
		var url = "/message";
		var message = $("#message-text").val();
		var subject = $("#subject").val() || "No Subject";
		var data = {cc, recipients, message, subject}


		$.ajax({
			url,
			type:"POST",
			data,
			success: function(res){
				$(".modal").modal("toggle");
			}
		})
	})
})	