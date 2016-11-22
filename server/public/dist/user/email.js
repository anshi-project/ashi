$(function(){
	$(".email-btn").on("click",function(){

		var emails = $(".team-table-active .player-email").text().trim();
		$("#recipient-name").val(emails);
	})

	$(".send-email-btn").on("click",function(){
		var url = "/message"
		// var recipients = $("#recipient-name").val();
		var message = $("#message-text").val() ;
		var subject = $("#subject").val() || "No Subject";
		var data = {recipients: "adamhs3521@gmail.com michael@freecodecamp.com ms-ams@outlook.com jasonrfcc@gmail.com",message:message, subject:subject}

		$.ajax({
			url:url,
			type:"POST",
			data:data,
			success: function(res){console.log(res); $(".modal").modal("toggle");}
		})
	})
})	