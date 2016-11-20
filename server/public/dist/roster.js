$(document).ready(function(){
	var tables=$(".team-table")
	
	function render(){
		var title=$("select option:selected").text();
		$(".team-roster-display").text(title)

		$.each(tables,function(t){
			if($(this).data("teamname")==title){
				$(this).addClass("team-table-active")
			}
		})
	}
	render();	

	$(".team-name").on("change",function(){
		$(".team-table-active").removeClass("team-table-active")
			render();
	})

	$(".email-btn").on("click",function(){

		var emails = $(".team-table-active .player-email").text().trim();
		$("#recipient-name").val(emails);
	})

	$(".send-email-btn").on("click",function(){
		var url = "/message"
		// var recipients = $("#recipient-name").val();
		var message = $("#message-text").val() ;
		var subject = $("#subject").val() || "No Subject";
		var data = {recipients: "adamhs3521@gmail.com michael@freecodecamp.com ms-ams@outlook.com jasonrfcc@gmail.com"
			, message, subject}

		$.ajax({
			url,
			type:"POST",
			data,
			success: res => {console.log(res); $(".modal").modal("toggle");}
		})
	})

});



